import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      let finalResult = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        finalResult.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(item => String(item.questionId) === dataQuestions[i].id)
        })
      }
      setDataResult(finalResult);
    }
    fetchApi();
  }, [])
  console.log(dataResult);
  return (
    <>
      <h1>Ket qua</h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
        
            <p>Cau {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Dung</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>

            {item.answers.map((itemAns, indexAns) => {
              let className = "";
              let checked = false;

              if(item.answer === indexAns){
                checked = true;
                className = "result__item--selected";
              }
              if(item.correctAnswer === indexAns){
                className += " result__item--result";
              }
              return (
                <div className="result__answer" key={indexAns}>
                  <input type="radio" checked={checked} disabled></input>
                  <label className={className}>{itemAns}</label>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
export default Result;