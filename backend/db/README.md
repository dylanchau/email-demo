1. Create database with name: `email_demo`

2. Execute the command: `npm run db:migrate`


## Here is the database design
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table emails {
  email_id SERIAL [PRIMARY KEY]
  sender_id INTEGER
  recipient_id INTEGER
  subject VARCHAR(255)
  body TEXT
  sent_date TIMESTAMP
  received_date TIMESTAMP
  status VARCHAR(20)
}

Table users {
  user_id integer [PRIMARY KEY]
  username VARCHAR(255)
  email VARCHAR(255)
  password VARCHAR(255)
}

Table attachments {
  attachment_id integer [PRIMARY KEY]
  email_id INTEGER 
  file_name VARCHAR(255)
  file_type VARCHAR(50) 
  file_size BIGINT
  aws_s3_link VARCHAR(255)
}

TABLE replies {
  reply_id integer [PRIMARY KEY]
  email_id INTEGER
  reply_to_id INTEGER
}


Ref: "users"."user_id" < "emails"."sender_id"

Ref: "users"."user_id" < "emails"."recipient_id"

Ref: "attachments"."email_id" > "emails"."email_id"

Ref: "emails"."email_id" < "replies"."email_id"

Ref: "replies"."reply_to_id" - "emails"."email_id"