export const ROOT = document.querySelector('#root');
export const POSITION = [0]

const STATE = {
    files: [
        {
            ID:0,
            name:'root',
            subID: null
        },
        {
            ID:1,
            name:'File1',
            format:'.txt',
            text: 'Text in file1',
            subID:0,
        },
        {
            ID:2,
            name:'Folder1',
            format: undefined,
            text: undefined,
            subID:0,
        },
        {
            ID:3,
            name:'File1',
            format:'.txt',
            text: undefined,
            subID:2,
        },
    ],
}
 
export const useState = {
    getFiles(position){
        return STATE.files.filter(element => element.subID === position);
    },
    setFiles(position, fileName, fileType, fileText){
        STATE.files.push({
            ID: STATE.files.length,
            name: fileName,
            format: fileType,
            text: fileText,
            subID: position,
        })
    }
}
// uneci useState function global, vory vortex uzes import anes
// inqy veradarcnum a const files u setFiles
// unenum es render function (petq a ashxati amen angam erb state-y update a linelu)
// unenum es router vor yst url-um exac idi state-ic cuc ta hamapatasxan filery
// nekakogo html. use only document.createElement instead of string html
// amen mi tag-y tox lini arandzin function