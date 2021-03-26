# TODO

### Requirements
* Clean Code
* TDD (Unit Testing, Linting | TSLint)
* CRUD User
* User need to be capable of changing Status
* Api Restful
* Strong typing (Avoid any NOT a choice)
* Documentation

### Database
* User Table
    * Id (String | UUID Pattern)
    * Name (String)
    * Password (String | Hashed & Salted)
    * Type (Relation)
    * Status (Boolean)
* Type Table
    * Id (String | UUID Pattern)
    * Description (String)

### Bussiness
* User can only have one Type
* Only Root or Admin user can modify any User field even Status field
* Only Root or Admin user can create new Users
* Only Root or Admin user can delete Users
* Default User can fetch it own information and can change self information also
* Users can login using their email and password


