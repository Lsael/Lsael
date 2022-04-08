import axios from "axios";
import { useEffect, useState } from "react";
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

const ArticleChart = (props) => {
/*     const today = new Date();
    console.log(today.toLocaleDateString('fr-FR')); */
    const [state,setState] = useState();
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json')
        .then((response) => {setState(response.data.pop())})
        .then(console.log(state))
    },[])
    return (
        <p>test</p>
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