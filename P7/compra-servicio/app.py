from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import os 

app = Flask(__name__)

# Configuración de la conexión a MySQL
app.config['MYSQL_HOST'] = os.getenv('DB_HOST', 'localhost')
#app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('DB_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('DB_PASS', 'password')
app.config['MYSQL_DB'] = 'compra_p4'
app.config['MYSQL_PORT'] = 3306

# Inicializar conexión con Flask-MySQLdb
mysql = MySQL(app)

# Api para registrar compra
@app.route('/compras/', methods=['POST'])
def registrar_compra():
    try:
        data = request.get_json()
        id_metodo_pago = data['id_metodo_pago']
        id_cliente = data['id_cliente']
        id_producto = data['id_producto']
        cantidad = data['cantidad']

        cursor = mysql.connection.cursor()
        sql = "INSERT INTO compra (id_metodo_pago, id_cliente, id_producto, cantidad) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (id_metodo_pago, id_cliente, id_producto, cantidad))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'mensaje': 'Compra registrada exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Api para ver compras
@app.route('/compras/', methods=['GET'])
def obtener_compras():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM compra")
        compras = cursor.fetchall()
        
        # Obtener nombres de las columnas
        column_names = [i[0] for i in cursor.description]
        
        # Convertir los datos en una lista de diccionarios
        compras_list = [dict(zip(column_names, compra)) for compra in compras]

        cursor.close()
        return jsonify(compras_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=3003)
