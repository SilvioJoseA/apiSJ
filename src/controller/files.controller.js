import XLSX from 'xlsx';
const controller = {};

controller.readFile = async ( nameFile ) => {
    try {
        const workbook = XLSX.readFile( nameFile ); // read file
        const sheetName = workbook.SheetNames[0]; // Get name of first page
        const sheet = workbook.Sheets[sheetName]; // Obtener los datos de la hoja
        const data = XLSX.utils.sheet_to_json(sheet); // Convertir los datos a JSON
        return data;
    } catch (error) {
        console.error(`Error to reed file :`, error.message);
    }
}
controller.parseArray = ( cursosData , arrayColumns ) => cursosData.map( ({ ...arrayColumns }) => [...arrayColumns]);
export default controller;