import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import data from "../../database/db.json"

const ArticleText = (props) => {
    return (
        <div className="articleHead">
            <h2 className="articleTitle">{props.data.name}</h2>
            <p className="articleText">{props.data.text}</p>
        </div>
    )
}

const ArticleChart = () => {
    const [chartData,setChartData] = useState(''); 
    const [labels,setlabels] = useState(''); 
    const [dataSets,setdataSets] = useState(''); 
    /* un argument dans useState est indispensable pour que le composant puisse faire un 
    premier rendu, sinon il renvoie undifined et crash */
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json')
        .then((response) => {
            const dataResponse = response.data.pop()
            setChartData(dataResponse)
            setlabels(dataResponse.tours[1].hypotheses[0].candidats.map((candidat) => {return (candidat.candidat)}))
            setdataSets(dataResponse.tours[1].hypotheses[0].candidats.map((candidat) => {return (candidat.intentions)}))
        })
    },[])

    console.log(chartData,labels,dataSets)

    return (
        <div>
            <h3>Source : {chartData.nom_institut}</h3>
            <p>test {chartData.id}</p>
        </div>
    )
}

const Article = () => {
    const { articleSlug,slug } = useParams();
    const dataTheme = data.themes.filter((theme) => {
            if (theme.id === slug) {
                return (theme)
            }
        });
    const dataArticle = dataTheme[0].articles.filter((article) => {
        if (article.id === articleSlug) {
            return (article)
        }
    });
    return ( 
        <div className="article">
            <ArticleText data={dataArticle[0]} />
            <ArticleChart />
        </div>
     );
}
 
export default Article;