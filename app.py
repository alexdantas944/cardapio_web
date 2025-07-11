from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cardapio')
def cardapio():
    with open('cardapio.json', encoding='utf-8') as f:
        dados = json.load(f)
    return jsonify(dados['itens'])
