import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'utec2023'
    SQLALCHEMY_DATABASE_URI = 'mysql://root:Alonso1204@localhost/new_schema'
    SQLALCHEMY_TRACK_MODIFICATIONS = False