from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    bio = db.Column(db.String)

    products = db.relationship('Product', backref='artist', cascade='all, delete-orphan')
    categories = association_proxy('products', 'category',
        creator=lambda c: Product(category=c))
    
    validates('name')
    def validate_name(self, key, value):
        if not (4 <= len(value) <= 25):
            raise ValueError(f'not a valid {key}! Must be between 4 and 25 characters in length...')
        return value
    
    validates('bio')
    def validate_bio(self, key, value):
        if not (50 <= len(value) <= 500):
            raise ValueError(f'{key} must be between 50 and 500 characters in length...')
        return value
    
    def __repr__(self):
        return f"Artist # {self.id}: {self.name} artist"

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String, nullable=False)
    category_description = db.Column(db.String, nullable=False)

    products = db.relationship('Product', backref='category', cascade='all, delete-orphan')
    artists = association_proxy('products', 'artist',
        creator=lambda a: Product(artist=a))
    
    validates('category_name')
    def validate_category_name(self, key, value):
        if not (3 <= len(value) <= 30):
            raise ValueError(f'{key} must be between 3 and 30 characters in length...')
        return value  

    validates('category_description')
    def validate_category_description(self, key, value):
        if not (10 <= len(value) <= 50):
            raise ValueError(f'{key} must be between 10 and 50 characters in length...')
        return value  
    
    def __repr__(self):
        return f"Category # {self.id}: {self.category_name}"
    
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    width = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer)
    description = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    img_url = db.Column(db.String)
    subject = db.Column(db.String)

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    # artist = db.relationship('Artist', back_populates='artists')
    # categories = db.relationship('Category', back_populates='categories')

    validates('title')
    def validate_category_name(self, key, value):
        if not (3 <= len(value) <= 50):
            raise ValueError(f'{key} must be between 3 and 50 characters in length...')
        return value

    validates('price')
    def validate_category_name(self, key, value):
        if not (0.01 <= value <= 999999999.99):
            raise ValueError(f'{key} must be higher than $0.01 and no higher than $1 Billion')
        return value
    

    validates('width')
    def validate_category_name(self, key, value):
        if not (0 <= value <= 240):
            raise ValueError(f'Not a valid {key}! Must be between 1 and 239 inches...')
        return value

    validates('height')
    def validate_category_name(self, key, value):
        if not (0 <= value <= 240):
            raise ValueError(f'Not a valid {key}! Must be between 1 and 239 inches...')
        return value
    
    validates('description')
    def validate_category_name(self, key, value):
        if not (10 <= len(value) <= 400):
            raise ValueError(f'{key} must be between 10 and 400 characters in length...')
        return value

    validates('quantity')
    def validate_category_name(self, key, value):
        if not (0 <= value):
            raise ValueError(f'{key} must be 1 or a higher amount...')
        return value    
    
    def __repr__(self):
        return f"Product # {self.id}: {self.title} {self.price} by {self.artist.name}."
    