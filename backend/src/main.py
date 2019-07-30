from flask import Flask, jsonify, request
from flask_cors import CORS
from .auth import AuthError, requires_auth
from .entities.entity import Session, engine, Base
from .entities.subject import Subject, SubjectSchema

# creating the Flask application
app = Flask(__name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)

@app.route('/subjects')
def get_subjects():
    # fetching from the database
    session = Session()
    subject_objects = session.query(Subject).all()

    # transforming into JSON-serializable objects
    schema = SubjectSchema(many=True)
    subjects = schema.dump(subject_objects)

    # serializing as JSON
    session.close()
    return jsonify(subjects.data)


@app.route('/subjects', methods=['POST'])
@requires_auth
def add_subject():
    # mount subject object
    posted_subject = SubjectSchema(only=('title', 'description'))\
        .load(request.get_json())

    subject = Subject(**posted_subject.data, created_by="HTTP post request")

    # persist subject
    session = Session()
    session.add(subject)
    session.commit()

    # return created subject
    new_subject = SubjectSchema().dump(subject).data
    session.close()
    return jsonify(new_subject), 201

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response