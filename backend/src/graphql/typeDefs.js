const typeDefs = `#graphql
scalar SequelizeJSON

# Table types
type User {
  id: ID!
  username: String
  email: String
  name: String
  password: String
  tasks: [Task] # associations
  role: Role # associations
  passwds: [Passwd] # associations
  uuid: String # hashes
}

type Role {
  id: ID!
  name: String
}

type Task {
  id: ID!
  desc: String
  result: String
  owner: User # associations
}

type Passwd {
  id: ID!
  url: String
  username: String
  password: String
}

# Queries
type Query {
  users(offset: Int, limit: Int, order: String, where: SequelizeJSON): [User]
  user(id: ID!): User

  tasks(offset: Int, limit: Int, order: String, where: SequelizeJSON): [Task]
  task(id: ID!): Task

  roles(offset: Int, limit: Int, order: String, where: SequelizeJSON): [Role]
  role(id: ID!): Role

  passwd(id: ID!): Passwd
}

# Inputs
input UserInput {
  username: String!
  email: String!
  name: String!
  password: String
  RoleId: Int
}

input TaskInput {
  desc: String
  UserId: Int
  result: String
}

input PasswdInput {
  url: String!
  username: String!
  password: String!
}

# Outputs
type Token {
  access_token: String
  user: User
  # refresh_token: String
}

type Mutation {
  signUp(user: UserInput!): User
  signIn(key: String!, password: String!): Token
  signInWithGoogle(idToken: String!, user: UserInput!): Token
  addTask(task: TaskInput!): Task
  updateTask(id: ID!, task: TaskInput!): [Int]
  addPasswd(passwd: PasswdInput!): Passwd
  deletePasswd(id: ID!): Int
  cv2Pdf(cv: String!): String
  jsFiddle(js: String!): String
  convertXml2Json(xml: String!): String
  mp3tag(mp3Buffer: String!): String
}
`
export default typeDefs