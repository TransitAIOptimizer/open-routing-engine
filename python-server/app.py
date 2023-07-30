import json
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import osmnx as ox

app = Flask(__name__)

@app.route('/upload_osm', methods=['POST'])
def upload_osm():
    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = f"./uploads/{filename}"
    file.save(filepath)

    # Загружаем граф дорог из файла .osm
    graph = ox.graph_from_xml(filepath)

    # Преобразуем граф в формат удобный для обработки
    nodes, edges = ox.graph_to_gdfs(graph)

      # Преобразуем данные узлов и ребер в JSON
    nodes_json = json.loads(nodes.to_json())
    edges_json = json.loads(edges.to_json())
    # Отправляем данные в ответ на запрос
    return jsonify({
        'nodes': nodes_json,
        'edges': edges_json,
    })

if __name__ == '__main__':
    app.run(debug=True)

