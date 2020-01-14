export interface Message{
  message: string
}

export interface User{
  _id?: string
  email?: string
  password?: string
  fullName?: string
  phone?: string
  roleId?: Number,
  key?: string
}

export interface Course{
  _id?: string
  title: string
  description?: string
}

export interface Specialty{
  _id?: string
  title: string
}

export interface Group{
  _id?: string
  title: string
  courseId?: any
  specialtyId?: any
}

export interface Planning{
  _id?: string
  title: string
  subjectId: string | Subject
  courseId?: string | Course
  specialtyId?: string | Specialty
}

export interface Setting{
  _id?: string
  teacherKey: string
  studentKey: string
}

export interface Subject{
  _id?: string
  title: string
  userId?: User | string
}

export interface Theme{
  _id?: string
  title: string
  courseId?: Course | string
  subjectId?: Subject | string
}