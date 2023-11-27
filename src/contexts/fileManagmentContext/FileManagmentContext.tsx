import { createContext, useContext, useState } from "react";
import { FileManagmentInterface, FileManagmentProvider } from "../../models/fileManagmentModels/FileManagmentContextModels";
import { AttachmentFile } from "../../models/fileManagmentModels/FileManagmentModels";
import { showErrorTost } from "../../components/generalComponents/toastComponent/ToastComponent";
import { serverRestApi } from "../../utils/apiConfig/apiServerConfig";
import { Response } from "../../models/responsesModels/responseModel";


const FileManagmentContext = createContext<FileManagmentInterface |undefined>(undefined);

export const FileManagmentContextProvider = ({ children } : FileManagmentProvider) => {

    //HomeworkAdjFiles
    const [homeworkAdjFiles, setHomeworkAdjFiles] = useState<AttachmentFile[]>([]);

    const getTeacherAttachments = async (assignment_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/homeworks/work/getAttachedFiles/${assignment_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setHomeworkAdjFiles(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    const contextValue :FileManagmentInterface = {
        //Teacher Attachment Files
        teacherAttachedFiles: homeworkAdjFiles,
        getTeacgerAttachedFiles: getTeacherAttachments,
    }

    return (
        <FileManagmentContext.Provider value={contextValue}>
            { children }
        </FileManagmentContext.Provider>
    )

}

export const useFileManagmentContext = () :FileManagmentInterface => {
    const context = useContext(FileManagmentContext)
    if(context === undefined){
        throw new Error('useFileManagmentContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

