import axios from 'axios';


export default class Manager {
    static async AuthorizationSession(email, password) {
        try {
            const response = await axios.post('http://localhost:8080/api/sessions', {
                email: email,
                password: password
              }, {withCredentials: true})
            return response.data;
          } catch (error) {
            console.log(error);
          }
    }
    
    static async getWorkers(){
        try{
            const response = await axios.get(`http://localhost:8080/api/workers`, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async createTask(title, description, dueDate, selectedWorkers, cardId, TaskColor){
        console.log(TaskColor);
        try{
            const response = await axios.post(`http://localhost:8080/api/tasks/create`,{
                title: title,
                description: description,
                dueDate: dueDate,
                selectedWorkers: selectedWorkers,
                cardId: cardId,
                TaskColor: TaskColor
            }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getBoardById(boardId){
        try{
            const response = await axios.get(`http://localhost:8080/api/boards/id/${boardId}`, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getDoneBoardById(boardId){
        try{
          const response = await axios.get(`http://localhost:8080/api/boards/done/${boardId}`, {
            withCredentials: true
          });
          return response.data;
        }
        catch(error){
          console.log(error);
        }
      }
      

    static async getAllBoards(){
        try{
            const response = await axios.get('http://localhost:8080/api/boards', {withCredentials: true});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllTasks(){
        try{
            const response = await axios.get('http://localhost:8080/api/tasks', {withCredentials: true});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getTasksByCardId(CardId){
        try{
            const response = await axios.get(`http://localhost:8080/api/tasks/id/${CardId}`, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async createBoard(BoardTitle){
        try{
            console.log(BoardTitle);
            const response = await axios.post(`http://localhost:8080/api/boards/create`,{
                BoardTitle: BoardTitle
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async createCard(CardTitle, CardDes, BoardId){
        try{
            const response = await axios.post(`http://localhost:8080/api/cards/create`,{
                CardTitle: CardTitle,
                CardDes: CardDes,
                BoardId: BoardId
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async deleteBoard(BoardId){
        try{
            const response = await axios.post(`http://localhost:8080/api/boards/delete`,{
                BoardId: BoardId
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async deleteCard(CardId){
        try{
            const response = await axios.post(`http://localhost:8080/api/cards/delete`,{
                CardId: CardId
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async deleteTask(TaskId){
        try{
            const response = await axios.post(`http://localhost:8080/api/tasks/delete`,{
                TaskId: TaskId
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async compliteTask(TaskId){
        try{
            const response = await axios.post(`http://localhost:8080/api/tasks/complite`,{
                TaskId: TaskId
              }, {withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getApplications(){
        try{
            const response = await axios.get(`http://localhost:8080/api/applications`,{withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async AcceptApplications(chatID){
        try{
            const response = await axios.post(`http://localhost:8080/api/applications/accept`,{
                chatID : chatID
            },{withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async RejectApplications(chatID){
        try{
            const response = await axios.post(`http://localhost:8080/api/applications/reject`,{
                chatID : chatID
            },{withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async DismissWorker(ID){
        try{
            const response = await axios.post(`http://localhost:8080/api/workers/dismiss`,{
                ID : ID
            },{withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

    static async GetNameCorp(){
        try{
            const response = await axios.get(`http://localhost:8080/api/user/corp`,{withCredentials: true});
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }   
}