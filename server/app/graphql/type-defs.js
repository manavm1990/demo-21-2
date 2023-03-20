import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    "Get all profiles"
    profiles: [Profile!]!
    "Get a profile by id"
    profile(id: ID!): Profile
    "Get all thoughts 💭"
    thoughts: [Thought!]!
    "Get a thought by id"
    thought(id: ID!): Thought
  }

  type Mutation {
    "Create a new profile"
    createProfile(name: String): Profile!
    "Add a skill to a profile"
    addSkill2Profile(id: ID!, skill: String!): Profile!
    "Remove a skill from a profile"
    removeSkillFromProfile(id: ID!, skill: String!): Profile!
    "Delete a profile"
    deleteProfile(id: ID!): Profile!
    "Create a new thought 💭"
    createThought(thoughtText: String!, thoughtAuthor: String!): Thought!
    "Add a comment to a thought 💭"
    addComment2Thought(id: ID!, commentText: String!): Thought!
    "Delete a comment from a thought 💭"
    deleteCommentFromThought(thoughtId: ID!, commentId: ID!): Thought!
    "Delete a thought 💭"
    deleteThought(id: ID!): Thought!
    "Create a new user"
    createUser(username: String!, password: String!): CreateUserLoginResponse!
    "Login a user"
    login(username: String!, password: String!): CreateUserLoginResponse!
  }

  type CreateUserLoginResponse {
    jwt: ID!
  }

  # This is basically a duplicate of the Mongoose schema
  type Profile {
    id: ID!
    "Full name of the person 🧑‍🦰"
    name: String!
    "A list of the person's programming skills 🧑‍💻"
    skills: [String]!
  }

  type Thought {
    id: ID!
    "The text of the thought 💭 (max 280 characters)"
    thoughtText: String!
    "The author of the thought 💭"
    thoughtAuthor: String!
    "The date and time the thought was created"
    createdAt: String!
    "A list of comments on the thought 💭"
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    "The text of the comment 💬 (max 280 characters)"
    commentText: String!
    "The date and time the comment was created"
    # A 'String' type (not a 'Date' type like in the Mongoose schema)
    # because GraphQL doesn't have a 'Date' type
    # It is possible to define a custom scalar type for a 'Date' type
    # but that is beyond the scope!
    # https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }
`;

export default typeDefs;
