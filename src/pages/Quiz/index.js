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

  console.log(dataQuestion);

  return(
    <>
      <h2>Bai quiz chu de: {dataTopic && (
        <>
          {dataTopic.name}
        </>
      )}</h2>
    </>
  )
}
export default Quiz;