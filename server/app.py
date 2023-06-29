from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource




from models import db, Artist, Product, Category

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
@app.route('/')
def index():
    return '<h1>products database</h1>'

class ProductsClass(Resource):
    
    def get(self):
        products = Product.query.all()

        response_body = []

        for product in products:
            response_body.append(product.to_dict(only=('id', 'title', 'price', 'width', 'height', 'description', 'quantity', 'img_url', 'subject', 'artist.name')))

        return make_response(jsonify(response_body), 200)
        
    def post(self):
        json_data = request.get_json()
        new_product = Product(artist_id=json_data.get('artist_id'), category_id=json_data.get('category_id'), title=json_data.get('title'), price=json_data.get('price'), width=json_data.get('width'), height=json_data.get('height'), description=json_data.get('description'), quantity=json_data.get('quantity'), img_url=json_data.get('img_url'), subject=json_data.get('subject'))
        db.session.add(new_product)
        db.session.commit()

        response_body = new_product.to_dict()

        return make_response(jsonify(response_body), 201)

api.add_resource(ProductsClass, '/products')

class ProductsById(Resource):
    def get(self, id):
        product = Product.query.filter(Product.id == id).first()

        if not product:
            response_body = {
                "error": "Product not found"
            }
            status = 404
        else:
            response_body = product.to_dict(only=('id', 'title', 'price', 'width', 'height', 'description', 'quantity', 'img_url', 'subject', 'artist.name'))
            status = 200
        
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        product = Product.query.filter(Product.id == id).first()

        if not product:
            response_body = {
                "error": "Product not found"
            }
            status = 404
        else:
            json_data = request.get_json()

            for key in json_data:
                setattr(product, key, json_data.get(key))

                db.session.commit()

                response_body = product.to_dict()
                status = 200
            
            return make_response(jsonify(response_body), status)
        
    def delete(self, id):
        product = Product.query.filter(Product.id == id).first()

        if not product:

            response_body = {
                "error": "Product not found"
            }
            status = 404

        else:

            db.session.delete(product)
            db.session.commit()

            response_body = {}

            status = 204

        return make_response(jsonify(response_body), status)

api.add_resource(ProductsById, '/products/<int:id>')

if __name__ == '__main__':
    app.run(port=7000, debug=True)