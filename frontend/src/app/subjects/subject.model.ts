export class Subject {
    constructor(
      public title: string,
      public description: string, 
      public long_description: string,    
      public _id?: number,
      public updatedAt?: Date,
      public createdAt?: Date,
      public lastUpdatedBy?: string
    ) { }
  }