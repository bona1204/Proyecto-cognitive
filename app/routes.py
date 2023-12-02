from flask import render_template,jsonify, redirect, url_for, request, flash, send_from_directory
from app import app, db
from app.models import User, Sensor, Admin
import os

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        # Asegúrate de que 'index.html' esté en la carpeta 'build'
        return send_from_directory(app.static_folder, 'index.html')


# Rutas para User
@app.route('/users', methods=['GET', 'POST'])
def list_users():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        user = User(username=username, password=password, email=email) 
        db.session.add(user)
        db.session.commit()
        flash('Usuario creado con éxito!')
        return redirect(url_for('list_users'))
    users = User.query.all()
    users=list(map(lambda item: item.serialize(), users))
    return jsonify(users),200

@app.route('/users/edit/<int:id>', methods=['GET', 'POST'])
def edit_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'POST':
        data = request.get_json()
        user.username = data.get('username')
        user.password = data.get('password')
        user.email = data.get('email')
        db.session.commit()
        flash('Usuario actualizado con éxito!')
        return redirect(url_for('list_users'))
    return jsonify(user)

@app.route('/users/delete/<int:id>', methods=['POST'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    flash('Usuario eliminado con éxito!')
    return redirect(url_for('list_users'))


