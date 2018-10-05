# Schemas

## User

```js
{
  id: ObjectId,
  username: string,
  createdDate: date,
  updatedDate: date,
  local?: {
    email: string,
    password: string,
    salt: string
  },
  google?: {
    token: string
  }
}
```

## Groups

```js
{
  id: ObjectId,
  name: string,
  description: string,
  owners: User.id[],
  users: User.id[]
}
```

## Campaign

```js
{
  id: ObjectId,
  name: string,
  description: string,
  owners: User.id[],
  users: User.id[]
}
```

## Map

```js
{
  id: ObjectId,
  name: string,
  description: string,
  s3Path: string,
  campaign?: Campaign.id
}
```
