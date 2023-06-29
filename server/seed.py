
from models import db, Artist, Category, Product
from app import app

with app.app_context():

# def seed_data():
    Artist.query.delete()
    Category.query.delete()
    Product.query.delete()
    artist1 = Artist(name='Artist 1', bio='Bio of Artist 1')
    artist2 = Artist(name='Artist 2', bio='Bio of Artist 2')

    # Create categories
    category1 = Category(category_name='Category 1', category_description='Description of Category 1')
    category2 = Category(category_name='Category 2', category_description='Description of Category 2')

    # Create products
    product1 = Product(title='Product 1', price=10, width=5, height=5, description='Description of Product 1', quantity=10, img_url='https//www.image.url123', subject='A starry night')
    product2 = Product(title='Product 2', price=20, width=10, height=10, description='Description of Product 2', quantity=20, img_url='https//www.image.url456', subject='Mona Lisa')

    # Associate artists, categories, and products
    artist1.products.append(product1)
    category1.products.append(product1)
    artist2.products.append(product2)
    category2.products.append(product2)

    # Add objects to the session
    db.session.add_all([artist1, artist2, category1, category2, product1, product2])
    db.session.commit()