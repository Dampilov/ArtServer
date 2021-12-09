const sequelize = require('../db')
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const MyArt = sequelize.define('my_art', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const MyLikes = sequelize.define('my_likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Art = sequelize.define('art', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    views: {type: DataTypes.INTEGER, defaultValue: 0},
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Character = sequelize.define('character', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    source: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(MyArt)
MyArt.belongsTo(User)

Art.hasOne(MyArt)
MyArt.belongsTo(Art)

User.hasOne(MyLikes)
MyLikes.belongsTo(User)

Art.hasOne(MyLikes)
MyLikes.belongsTo(Art)

Art.hasMany(Author)
Author.belongsTo(Art)

Art.hasMany(Tag, {as: 'tags'})
Tag.belongsTo(Art)

Art.hasMany(Type)
Type.belongsTo(Art)

Art.hasMany(Character)
Character.belongsTo(Art)

module.exports = {
    User,
    Art,
    MyArt,
    MyLikes,
    Author,
    Tag,
    Type,
    Character
}