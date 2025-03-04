import { useEffect, useState } from "react";
import {data, useNavigate, useParams} from "react-router-dom"
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
function Quiz(){
  const params = useParams();
  const [dataTopic,setDataTopic] = useState();
  const [dataQuestion,setDataQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    }
    fetchApi();
  },[])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestion(response);
    }
    fetchApi();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let choiceAnswers = [];
    for(let i = 0; i < e.target.elements.length; i++){
      if(e.target.elements[i].checked){
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        choiceAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        })
      }
    }
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: choiceAnswers
    }
    const response = await createAnswer(options);
    if(response){
      navigate(`/result/${response.id}`);
    }
  }



  return(
    <>
      <h2>Bai quiz chu de: {dataTopic && (
        <>
          {dataTopic.name}
        </>
      )}</h2>
      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item,index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>Cau {index+1}: {item.question}</p>
              {item.answers.map((itemAns,indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`}></input>
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                </div>
              ))}
            </div>
          ))}
        <button type="submit">Nop bai</button>
        </form>

      </div>
    </>
  )
}
export default Quiz;