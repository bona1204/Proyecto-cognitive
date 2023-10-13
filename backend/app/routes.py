from flask import render_template, redirect, url_for, request, flash
from app import app, db
from app.models import User, Sensor, Admin


@app.route('/')
def index():
    return "Hola, bienvenido a mi aplicación Flask!"
# Rutas para User
@app.route('/users', methods=['GET', 'POST'])
def list_users():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        user = User(username=username, email=email) 
        db.session.add(user)
        db.session.commit()
        flash('Usuario creado con éxito!')
        return redirect(url_for('list_users'))
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route('/users/edit/<int:id>', methods=['GET', 'POST'])
def edit_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'POST':
        user.username = request.form['username']
        user.email = request.form['email']
        db.session.commit()
        flash('Usuario actualizado con éxito!')
        return redirect(url_for('list_users'))
    return render_template('edit_user.html', user=user)

@app.route('/users/delete/<int:id>', methods=['POST'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    flash('Usuario eliminado con éxito!')
    return redirect(url_for('list_users'))

# (Similarmente, puedes agregar rutas para Sensor, RegistroSensor y Admin...)
