import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { parseGraphData } from './parseGraphData'; // ваша функция для преобразования данных графа
// import { Graph } from './graph/graph'; // ваш класс для представления графа

export async function uploadOsmFileAndProcessGraph(filePath: any) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await axios.post('http://localhost:5000/upload_osm', form, {
    headers: form.getHeaders(),
  });

  if (response.status !== 200) {
    console.error(
      'Failed to upload .osm file and get graph data:',
      response.status,
      response.statusText,
    );
    return;
  }
  // console.log('RESPONSE ===', response.data);
  // Преобразуем данные в формат, подходящий для вашего класса Graph
  const graphData = parseGraphData(response.data);
  // console.log('GRAPHDATA ===', graphData);
  // Создаем новый объект класса Graph с помощью полученных данных
  // const graph = new Graph(graphData);

  return graphData;
}
