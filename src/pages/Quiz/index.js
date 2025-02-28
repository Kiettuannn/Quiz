import { useEffect, useState } from "react";
import {data, useParams} from "react-router-dom"
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
function Quiz(){
  const params = useParams();
  const [dataTopic,setDataTopic] = useState();
  const [dataQuestion,setDataQuestion] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }
  // console.log(dataQuestion);

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