from .entities.entity import Session, engine, Base
from .entities.subject import Subject

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
subjects = session.query(Subject).all()

if len(subjects) == 0:
    # create and persist dummy exam
    python_subject = Subject("Japanese", "The national language of glorious Nippon.", "script")
    session.add(python_subject)
    session.commit()
    session.close()

    # reload subjects
    subjects = session.query(Subject).all()

# show existing subjects
print('### Subjects:')
for subject in subjects:
    print(f'({subject.id}) {subject.title} - {subject.description}')