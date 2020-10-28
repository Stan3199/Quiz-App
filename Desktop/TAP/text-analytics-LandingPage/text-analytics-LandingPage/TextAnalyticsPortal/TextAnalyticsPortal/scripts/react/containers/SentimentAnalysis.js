import React, { useState, useEffect } from "react";
import '../../styles/SentimentAnalysis.css';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { infoData } from '../constants/InfoText';
import TableComponent from '../components/DetailedGrid';
import data from '../components/data.json';
import column from '../components/column.json';
import Progress from 'react-circle-progress-bar';
import TabPanel from '../components/TabPanel';
import CardComponent from '../components/Tile';
import SingleColumnTable from '../components/SingleColumnTable';
import { AreaChart, Legend, Label, Area, XAxis, YAxis, CartesianGrid, linearGradient, ResponsiveContainer, Bar } from 'recharts';
import { Tooltip as Tooltip1 } from 'recharts';
import ChartComponent from '../components/ChartComponent';
import ReactWordcloud from "react-wordcloud";


import config from "../config";
const useStyles = makeStyles({
    root: {
        width: "500px",
    },
    show: {
        opacity: 1,
    },
    hide: {
        opacity: 0.2,
    },
    buttonactive: {
        backgroundColor: "#534e9b",
    },
    buttoninactive: {
        backgroundColor: "#8279CF",
    },
    title: {
        marginTop: "auto",
    },
    wrapper: {
        display: "grid",
        gridTemplateColumns: "400px 400px 400px 400px",
        gridGap: "20px",
        backgroundColor: "#fff",
        color: "#444",
    },
    iconDownload: {
        height: "5vh !important",
        width: "5vh !important",
        marginRight: "2vh !important",
        alignSelf: "center !important",
    },
    closeButtonStyle: {
        verticalAlign: "middle",
        backgroundColor: "darkgray",
        borderRadius: "50px",
        padding: "2px 4px 0px",
        marginLeft: "7px",
    },
    infoIcon: {
        verticalAlign: "middle",
    },
    iconSize: {
        width: "20px",
        height: "20px"
    }
});

const VisualTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "white",
        color: "black",
        maxWidth: 250,
        fontSize: "large",
        border: "1px solid #dadde9",
    },
}))(Tooltip);
function SentimentAnalysis(props) {

    const classes = useStyles();

    //[{ name: 'Weired', count: 7 }, { name: 'Bad', count: 19 }, { name: 'Disgusting', count: 11 }, { name: 'worthy', count: 17 }];

    const [pan_fin, setPan_Fin] = useState([]);
    const [chart_data_fin, setChart_data_fin] = useState([]);
    const [word_fin, setWord_fin] = useState([]);
    const [active_sent, setActive_sent] = useState('0');

    const [isLoading, setIsLoading] = React.useState(false);
    const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
    const [texts, setTexts] = useState('')
    const [requestJSON, setRequestJSON] = useState({
        typeofdata: 'Sentiment Data',
        "data":
            props.sentreq
        //    [
        //    {
        //        "id": "0",
        //        "text": "Great CD: My lovely Pat has one of the GREAT voices of her generation. I have listened to this CD for YEARS and I still LOVE IT. When I'm in a good mood it makes me feel better. A bad mood just evaporates like sugar in the rain. This CD just oozes LIFE. Vocals are jusat STUUNNING and lyrics just kill. One of life's hidden gems. This is a desert isle CD in my book. Why she never made it big is just beyond me. Everytime I play this, no matter black, white, young, old, male, female EVERYBODY says one thing \"Who was that singing ?\""
        //    },
        //    {
        //        "id": "1",
        //        "text": "One of the best game music soundtracks - for a game I didn't really play: Despite the fact that I have only played a small portion of the game, the music I heard (plus the connection to Chrono Trigger which was great as well) led me to purchase the soundtrack, and it remains one of my favorite albums. There is an incredible mix of fun, epic, and emotional songs. Those sad and beautiful tracks I especially like, as there's not too many of those kinds of songs in my other video game soundtracks. I must admit that one of the songs (Life-A Distant Promise) has brought tears to my eyes on many occasions.My one complaint about this soundtrack is that they use guitar fretting effects in many of the songs, which I find distracting. But even if those weren't included I would still consider the collection worth it."
        //    },
        //    {
        //        "id": "2",
        //        "text": "Batteries died within a year ...: I bought this charger in Jul 2003 and it worked OK for a while. The design is nice and convenient. However, after about a year, the batteries would not hold a charge. Might as well just get alkaline disposables, or look elsewhere for a charger that comes with batteries that have better staying power."
        //    },
        //    {
        //        "id": "3",
        //        "text": "works fine, but Maha Energy is better: Check out Maha Energy's website. Their Powerex MH-C204F charger works in 100 minutes for rapid charge, with option for slower charge (better for batteries). And they have 2200 mAh batteries."
        //    }
        //]

    });
    const [responseData, setResponseData] = useState('');
    const getresponse = () => {
        //console.log(responseData);
        //responseData ? getData() : setInterval(() => { console.log("2 seconds"); getresponse() }, 2000);
    }

    //componentWillReceiveProps(nextProps) {
    //    setResponseData(nextProps.sentresponse);
    //    getData();
    //}
    //console.log("re-rendering");
    useEffect(() => {
        setIsLoading(true);
        //console.log("happening")
        if (props.sentresponse !== '') {
            setResponseData(props.sentresponse["result"]);
            document.getElementById("show-sent-modelling").style.display = "inline-block";
            document.getElementById("hide-sent-modelling").style.display = "none";
            console.log("reponse coming     ", props.sentresponse["result"])
        }

        //getresponse();
        //    console.log(props.sentreq)
        //    setResponseData(source[])
        //    //setRequestJSON(props.sentreq)
        //    useVisualData(requestJSON).then((source) => {
        //        console.log(source)
        //        console.log(source["result"])
        //        setResponseData(source["result"])
        //    }).catch(error => {
        //        console.log(error)
        //        setOpenErrorPopup(true);
        //    });

    }, [props.sentresponse])

    useEffect(() => {
        if (responseData) { getData(); setIsLoading(false) };
    }, [responseData])
    if (isLoading) {
        document.getElementById("overlay-main").style.display = "block";
    } else {
        document.getElementById("overlay-main").style.display = "none";
    }


    const [Total_Comm_Score, setTotal_Comm_Score] = useState('');
    const [Net_Positive, setNet_Positive] = useState('');
    const [Net_Negative, setNet_Negative] = useState('');
    const [Net_Nuetral, setNet_Nuetral] = useState('');
    const [Overal, setOveral] = useState('');
    let Overall_Strength;
    const [word_cloud, setWord_cloud] = useState('');
    const [word_cloud_pos, setWord_cloud_pos] = useState('');
    const [word_cloud_neg, setWord_cloud_neg] = useState('');
    const [table_data, setTable_data] = useState([]);
    const [panel_data, setPanel_data] = useState('');
    const [panel_all, setPanel_all] = useState([]);
    const [panel_data_pos, setPanel_data_pos] = useState([]);
    const [panel_data_neg, setPanel_data_neg] = useState([]);
    const [panel_data_neu, setPanel_data_neu] = useState([]);
    const [pos_data, set_pos_data] = useState([]);
    const [neg_data, set_neg_data] = useState([]);
    const [net_count, setNet_count] = useState('');
    const [pos_count, setPos_count] = useState('');
    const [neg_count, setNeg_count] = useState('');
    const [neu_count, setNeu_count] = useState('');
    let short_tab_data;
    let pass_positive = [];
    let pass_negative = [];

    const getData = () => {
        //console.log("asdasd");
        setTotal_Comm_Score(Math.trunc(Object.keys(responseData).reduce((sum, key) => sum + parseFloat(responseData[key].sentiment_score || 0), 0)));
        let pos, neg, neu;
        setNet_count(Object.keys(responseData).length);
        setPos_count(Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Positive").length);
        setNeg_count(Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Negative").length);
        setNeu_count(Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Neutral").length);
        
        pos = Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Positive").length ;
        setNet_Positive((pos / Object.keys(responseData).length * 100).toFixed(2));
        neg = Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Negative").length / Object.keys(responseData).length * 100;
        setNet_Negative(neg.toFixed(2));
        neu = Object.keys(responseData).filter(key => responseData[key].sentiment_cat == "Neutral").length / Object.keys(responseData).length * 100;
        setNet_Nuetral(neu.toFixed(2));
        //console.log("nuertralll" + Net_Nuetral)
        Overall_Strength = 2;
        console.log((Net_Positive / (Net_Positive + Net_Negative)) * 100);
        setOveral(((pos / (pos + neg)) * 100).toFixed(2));
        setWord_cloud(getWordCloud());
        setTable_data(getTableData());
        setPanel_data(getPanelData());
        sort_table_data();
        //console.log(word_cloud)
    }
    //console.log("aaaaa", tab)
    const sort_table_data = () => {
        let pan_pos = [];
        let pan_neg = [];
        let pan_neu = [];
        let pan_all = [];

        Object.keys(responseData).map((key, index) => {
            if (responseData[key].sentiment_cat == "Positive") {
                pan_pos.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                }); pan_all.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                })
            }
            if (responseData[key].sentiment_cat == "Negative") {
                pan_neg.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                }); pan_all.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                })
            }
            if (responseData[key].sentiment_cat == "Neutral") {
                pan_neu.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                }); pan_all.push({
                    "Dominant_Topic_Name": responseData[key].sentiment_cat,
                    "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                    "text": props.sentreq[index].text
                })
            }

        })
        setPanel_all(pan_all);
        setPanel_data_neu(pan_neu);
        setPanel_data_pos(pan_pos);
        setPanel_data_neg(pan_neg);
        setPan_Fin(pan_all);
    }
    const getPanelData = () => {
        let pan_dat = [];
        let p0 = {};
        let pos0, neg0, neu0;
        pos0 = neg0 = neu0 = 0;
        let pos20, neg20, neu20;
        pos20 = neg20 = neu20 = 0;
        let pos40, neg40, neu40;
        pos40 = neg40 = neu40 = 0;
        let pos60, neg60, neu60;
        pos60 = neg60 = neu60 = 0;
        let pos80, neg80, neu80;
        pos80 = neg80 = neu80 = 0;
        let pos100, neg100, neu100;
        pos100 = neg100 = neu100 = 0;
        Object.keys(responseData).map((key, index) => {
            if ((responseData[key].sentiment_score * 100) == 0) {
                if (responseData[key].sentiment_cat == "Positive") pos0++;
                if (responseData[key].sentiment_cat == "Negative") neg0++;
                if (responseData[key].sentiment_cat == "Neutral") neu0++;
            }
            if ((responseData[key].sentiment_score * 100) > 0 && (responseData[key].sentiment_score * 100) <= 20) {
                if (responseData[key].sentiment_cat == "Positive") pos20++;
                if (responseData[key].sentiment_cat == "Negative") neg20++;
                if (responseData[key].sentiment_cat == "Neutral") neu20++;
            }
            if ((responseData[key].sentiment_score * 100) > 20 && (responseData[key].sentiment_score * 100) <= 40) {
                if (responseData[key].sentiment_cat == "Positive") pos40++;
                if (responseData[key].sentiment_cat == "Negative") neg40++;
                if (responseData[key].sentiment_cat == "Neutral") neu40++;
            }
            if ((responseData[key].sentiment_score * 100) > 40 && (responseData[key].sentiment_score * 100) <= 60) {
                if (responseData[key].sentiment_cat == "Positive") pos60++;
                if (responseData[key].sentiment_cat == "Negative") neg60++;
                if (responseData[key].sentiment_cat == "Neutral") neu60++;
            }
            if ((responseData[key].sentiment_score * 100) > 60 && (responseData[key].sentiment_score * 100) <= 80) {
                if (responseData[key].sentiment_cat == "Positive") pos80++;
                if (responseData[key].sentiment_cat == "Negative") neg80++;
                if (responseData[key].sentiment_cat == "Neutral") neu80++;
            }
            if ((responseData[key].sentiment_score * 100) > 80 && (responseData[key].sentiment_score * 100) <= 100) {
                if (responseData[key].sentiment_cat == "Positive") pos100++;
                if (responseData[key].sentiment_cat == "Negative") neg100++;
                if (responseData[key].sentiment_cat == "Neutral") neu100++;
            }
        })

        return [
            { "name": "0", "Negative": neg0, "Positive": pos0, "Neutral": neu0 },
            { "name": "0 - 20%", "Negative": neg20, "Positive": pos20, "Neutral": neu20 },
            { "name": "20 - 40%", "Negative": neg40, "Positive": pos40, "Neutral": neu40 },
            { "name": "40 - 60%", "Negative": neg60, "Positive": pos60, "Neutral": neu60 },
            { "name": "60 - 80%", "Negative": neg80, "Positive": pos80, "Neutral": neu80 },
            { "name": "80 -100%", "Negative": neg100, "Positive": pos100, "Neutral": neu100 },
        ]
    }
    const getTableData = () => {
        let tab_sortData = [];
        Object.keys(responseData).map((key, index) => {
            tab_sortData.push({
                "Dominant_Topic_Name": responseData[key].sentiment_cat,
                "Topic_Perc_Contrib": Math.trunc(responseData[key].sentiment_score * 100),
                "text": props.sentreq[index].text
            })
        })
        //console.log("aaaaaaa",tab_sortData)
        return tab_sortData;

    }
    const getWordCloud = () => {
        let Positive_Words = {};
        let Negative_Words = {};
        Object.keys(responseData).map((key, index) => {
            let parent = responseData[key].positive_keyphrase;
            let parent2 = responseData[key].negative_keyphrase;
            Object.keys(parent).map((keyy, index) => {
                if (Positive_Words.hasOwnProperty(keyy)) {
                    if (parent[keyy] >= Positive_Words[keyy]) {
                        Positive_Words[keyy] = parent[keyy];
                    }
                }
                else {
                    Positive_Words[keyy] = parent[keyy];
                }
            })
            Object.keys(parent2).map((key, index) => {
                if (Negative_Words.hasOwnProperty(key)) {
                    if (parent2[key] >= Negative_Words[key]) {
                        Negative_Words[key] = parent2[key];
                    }
                }
                else {
                    Negative_Words[key] = parent2[key];
                }
            })

        })
        var sorted_positive = [];
        var sorted_negative = [];
        let all_comments = [];
        for (var res in Positive_Words) {
            sorted_positive.push([res, Positive_Words[res]]);
            all_comments.push([res, Positive_Words[res]]);
        }
        for (var res in Negative_Words) {
            sorted_negative.push([res, Negative_Words[res]]);
            all_comments.push([res, Negative_Words[res]]);
        }

        sorted_positive.sort((a, b) => {
            return b[1] - a[1];
        });
        sorted_negative.sort((a, b) => {
            return b[1] - a[1];
        })
        all_comments.sort((a, b) => {
            return b[1] - a[1];
        })
        let pass_all = [];
        let bar_positive = [];
        let bar_negative = [];
        for (let i = 0; i < sorted_positive.length; i++) {
            let kk = sorted_positive[i][0];
            if (i <= 6) bar_positive.push({ "Frequency": sorted_positive[i][1], "text": [kk] })
            pass_positive.push({ "value": sorted_positive[i][1], "text": [kk] })
        }
        for (let i = 0; i < sorted_negative.length; i++) {
            let nn = sorted_negative[i][0];
            if (i <= 6) bar_negative.push({ "Frequency": sorted_negative[i][1], "text": [nn] })
            pass_negative.push({ "value": sorted_negative[i][1], "text": [nn] });
        }
        for (let i = 0; i < all_comments.length; i++) {
            let ac = all_comments[i][0];
            //console.log(ac);
            pass_all.push({ "value": all_comments[i][1], "text": [ac] });
        }

        setWord_cloud_pos(pass_positive.slice(0, 40));
        setWord_cloud_neg(pass_negative.slice(0, 40));

        set_pos_data(bar_positive);
        set_neg_data(bar_negative);
        //console.log(bar_negative + " " + neg_data + " " + sorted_negative);
        //console.log(all_comments, pass_all)
        setWord_fin(pass_all);
        return pass_all;

    }

    const callbacks = {
        getWordColor: word => word.value > 50 ? "blue" : "red",
        onWordClick: console.log,
        onWordMouseOver: console.log,
        getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
    }
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
    };
    const size = [400, 400];

    const cardClick = (title) => {

        var style = document.createElement('style');
        style.appendChild(document.createTextNode('div[class="cardcomponent-main"]{border:none}div[title="' + title + '"] {border: 2px solid #3a31aa}'));
        document.body.appendChild(style);

        if (title == 'Net Sentiment') {
            console.log("clicked")
            setActive_sent('0');
            setPan_Fin(panel_all)
            setChart_data_fin(panel_data);
            setWord_fin(word_cloud.slice(0, 30));
        }
        else if (title== 'Net Positive'){
            //data rendering for Positive
            setActive_sent('1');
            setPan_Fin(panel_data_pos);
            setChart_data_fin(panel_data);
            setWord_fin(word_cloud_pos.slice(0, 30));

        }
        else if (title == 'Net Negative') {
            setActive_sent('3');
            setPan_Fin(panel_data_neg)
            setChart_data_fin(panel_data);
            setWord_fin(word_cloud_neg.slice(0, 30));
            }
        else if (title == 'Net Neutral') {
            setActive_sent('2');
            setPan_Fin(panel_data_neu);
            setChart_data_fin(panel_data);
            setWord_fin(word_cloud.slice(0, 30));
        }
                    

    }
    return (
        <div id='sentimentanalysis-main' className={document.getElementById("sidenavbar-main") !== null && document.getElementById("sidenavbar-main").className === "nav-mini" ? "minimization" : "maximized"}>
            <div id="pdf-sent-container">

                <div id="card-container">
                    <CardComponent
                        Value={0}
                        Title="👍Net Sentiment"
                        Tooltip="Net Sentiment"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                            <VisualTooltip placement="top-end" arrow title={infoData.info11}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                        Action={() => { cardClick('Net Sentiment') }}
                        Prog={net_count}
                        Perc={Overal}
                        Color={Overal > 70 ? 'green' : Overal > 40 ? 'orange' : 'red'}
                    />
                    <CardComponent
                        Value={0}
                        Title="😍 Positive Comments"
                        Tooltip="Net Positive"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info12}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                        Action={() => { cardClick('Net Positive') }}
                        Prog={pos_count}
                        Perc={Net_Positive}
                        Color={'green'}
                    />
                    <CardComponent
                        Value={0 + "%"}
                        Title="😐 Neutral Comments"
                        Tooltip="Net Neutral"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info13}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                        Action={() => { cardClick('Net Neutral') }}
                        Perc={Net_Nuetral}
                        Prog={neu_count}
                        Color={'orange'}
                    />
                    <CardComponent
                        Value={0}
                        Title="😡 Negative Comments"
                        Tooltip="Net Negative"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info14}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                        Action={() => { cardClick('Net Negative') }}
                        Perc={Net_Negative}
                        Prog={neg_count}
                        Color={'red'}
                    />
                </div>
                <div className="grid-wrapper">
                    <div className="grid-heading grid-title7-sent">
                        Top 5 Comments with Strongest Sentiment{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info15}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item7-sent">
                        <SingleColumnTable
                            data={pan_fin}
                            columns={[{
                                "Header": " Top 5  Reviews",
                                "accessor": "text"
                            }]}

                        />
                    </div>
                    <div className="grid-heading grid-title8-sent">
                        Sentiment Area Chart {" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info16}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    { active_sent == '0'?
                    <div className="grid-box grid-item8-sent">
                        <ResponsiveContainer>
                            <AreaChart width={600} height={300} data={panel_data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAm" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="orange" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'No. of comments', angle: -90, position: 'left', textAnchor: 'middle', offset: -8 }} /> 
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip1 />
                                <Legend verticalAlign='top' />


                                    <Area type="monotone" dataKey="Positive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                    <Area type="monotone" dataKey="Negative" stroke="red" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="Neutral" stroke="orange" fillOpacity={1} fill="url(#colorAm)" />

                            </AreaChart>
                        </ResponsiveContainer>
                        </div> :
                        active_sent == '1' ?
                            <div className="grid-box grid-item8-sent">
                                <ResponsiveContainer>
                                    <AreaChart width={600} height={300} data={panel_data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="red" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorAm" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="orange" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis label={{ value: 'No. of comments', angle: -90, position: 'left', textAnchor: 'middle', offset: -8 }} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip1 />
                                        <Legend verticalAlign='top' />


                                        <Area type="monotone" dataKey="Positive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                        

                                    </AreaChart>
                                </ResponsiveContainer>
                            </div> :
                            active_sent == '2' ?
                                <div className="grid-box grid-item8-sent">
                                    <ResponsiveContainer>
                                        <AreaChart width={600} height={300} data={panel_data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="red" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorAm" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="orange" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" />
                                            <YAxis label={{ value: 'No. of comments', angle: -90, position: 'left', textAnchor: 'middle', offset: -8 }} />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip1 />
                                            <Legend verticalAlign='top' />


                                            <Area type="monotone" dataKey="Neutral" stroke="orange" fillOpacity={1} fill="url(#colorAm)" />

                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div> :
                                active_sent == '3' ?
                                    <div className="grid-box grid-item8-sent">
                                        <ResponsiveContainer>
                                            <AreaChart width={600} height={300} data={panel_data}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorAm" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="orange" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" />
                                                <YAxis label={{ value: 'No. of comments', angle: -90, position: 'left', textAnchor: 'middle', offset: -8 }} />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip1 />
                                                <Legend verticalAlign='top' />

                                                <Area type="monotone" dataKey="Negative" stroke="red" fillOpacity={1} fill="url(#colorUv)" />
                                                

                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>:null

                }


                    <div className="grid-heading grid-title1-sent">
                        What is Driving Sentiment Up?{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info17}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item1-sent">
                        <ChartComponent
                            data={pos_data}
                            type="bar"
                            color={{ primary: "green" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />

                    </div>

                    <div className="grid-heading grid-title2-sent">
                        Word Cloud{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info20}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item2-sent">

                        <ReactWordcloud
                            words={word_fin}
                            options={config.wordCloudOptions}
                        />

                    </div>
                    <div className="grid-heading grid-title3-sent">
                        What is Driving Sentiment Down?{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info18}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item3-sent">
                        <ChartComponent
                            data={neg_data}
                            type="bar"
                            color={{ primary: "#e16d11" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />
                    </div>
                    <div className="grid-heading grid-title9-sent">
                        Feedback Comments{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info19}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item9-sent">
                        <TableComponent order={active_sent=='3'?false:true}
                            data={pan_fin}
                            columns={[{

                                Header: "Reviews",
                                accessor: "text",
                                minWidth: 700,
                                maxWidth: 1200

                            },
                            {

                                Header: "Sentiment",
                                accessor: "Dominant_Topic_Name"

                            },
                            {

                                Header: "Sentiment Score (%)",
                                accessor: "Topic_Perc_Contrib",
                                Cell: row => (
                                    <div style={{ textAlign: "right" }}>{row.value}</div>
                                )
                            }]}
                        />
                    </div>

                </div>

            </div>
        </div >

    );
}

export default SentimentAnalysis;
