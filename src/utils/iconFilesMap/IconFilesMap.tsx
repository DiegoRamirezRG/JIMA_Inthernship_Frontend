import { BsFileEarmarkZip, BsFileText, BsFiletypeCss, BsFiletypeCsv, BsFiletypeDocx, BsFiletypeExe, BsFiletypeGif, BsFiletypeHtml, BsFiletypeJpg, BsFiletypeJs, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePdf, BsFiletypePng, BsFiletypePptx, BsFiletypeTxt, BsFiletypeXlsx } from "react-icons/bs";

export const iconFiles = new Map<string, JSX.Element>([
    ['jpg',     <BsFiletypeJpg />       ],
    ['png',     <BsFiletypePng />       ],
    ['gif',     <BsFiletypeGif />       ],
    ['docx',    <BsFiletypeDocx />      ],
    ['pdf',     <BsFiletypePdf />       ],
    ['zip',     <BsFileEarmarkZip />   ],
    ['txt',     <BsFiletypeTxt />       ],
    ['mp4',     <BsFiletypeMp4 />       ],
    ['mp3',     <BsFiletypeMp3 />       ],
    ['exe',     <BsFiletypeExe />       ],
    ['js',      <BsFiletypeJs />        ],
    ['css',     <BsFiletypeCss />       ],
    ['html',    <BsFiletypeHtml />      ],
    ['pptx',     <BsFiletypePptx />     ],
    ['xlsx',    <BsFiletypeXlsx />      ],
    ['csv',     <BsFiletypeCsv />       ],
    ['rar',     <BsFileEarmarkZip />    ],
    ['7z',      <BsFileEarmarkZip />    ],
]);


export const fileExt = (nombreArchivo: string): string | null  => {
    const partesNombre = nombreArchivo.split('.');
    const ultimaParte = partesNombre[partesNombre.length - 1];
    const extension = ultimaParte.toLowerCase();
    return extension;
}

export const getFileIcon = (ext: string) => {
    const descripcionExtension = iconFiles.get(ext);
    return descripcionExtension !== undefined ? descripcionExtension : <BsFileText /> ;
}