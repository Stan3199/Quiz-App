import React, { useState, useEffect } from "react";
import "../../styles/TopicModelling.css";
import PopupComponent from '../components/PopupComponent.js';
import ReactWordcloud from "react-wordcloud";
import CardComponent from "../components/CardComponent";
import ChartComponent from "../components/ChartComponent";
import TableComponent from "../components/TableComponent";
import { withStyles, makeStyles }  from "@material-ui/core/styles";
import config from "../config.js";

import { useVisualData } from "../hooks/useVisualData";
import { getData } from "../hooks/getData";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { infoData } from '../constants/InfoText';
import { Link, animateScroll as scroll } from "react-scroll";
import { set } from "d3";

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



let topicObj = {};
let removeTopicItems = [];

function TopicModelling(props) {
    const [open, setOpen] = React.useState(false);
    const [openErrorPopup, setOpenErrorPopup] = React.useState(false);

  document.getElementById("item-topicmodelling").classList.remove("nav-disabled");
  

    function FunctionalityComponent({ obj, value }) {
    const [newKeyword, setNewKeyword] = React.useState(obj[value]["keys"]);
    const [newTopic, setNewTopic] = React.useState(obj[value]["top"]);
    const [click, setClick] = React.useState(false);

    const handleEdit = (index) => {
      setClick(!click);
      topicObj[index]["keys"] = newKeyword;
      topicObj[index]["top"] = newTopic;
      topicObj[index]["clicked"] = click;
    };

    const handleNewKeyword = (e) => {
      setNewKeyword(e.target.value);
    };

    const handleNewTopic = (e) => {
      setNewTopic(e.target.value);
    };

    const handleRemove = (value) => {
      setData((data) => data.filter((val, item) => val !== value));
      delete topicObj[value];
    };

    return (
      <div className="input-area" key={value}>
        <span className="input-text">Keywords</span>
        <input
          className="input-area1"
          value={newKeyword}
          onChange={(e) => handleNewKeyword(e)}
          placeholder="Enter Here"
          disabled={topicObj[value]["clicked"]}
        />
        <span className="input-text">Topic</span>
        <input
          className="input-area1"
          value={newTopic}
          onChange={(e) => handleNewTopic(e)}
          placeholder="Enter Here"
          disabled={topicObj[value]["clicked"]}
        />
        <button
                className={`button editsavebutton  ${classes.buttonactive}`}
          onClick={() => handleEdit(value)}
        >
          {topicObj[value]["clicked"] ? "Edit" : "Save"}
        </button>
        <button
                className={`button editsavebutton ${classes.buttonactive}`}
          onClick={() => handleRemove(value)}
        >
          Remove
        </button>
      </div>
    );
  }

    const [requestJSON, setRequestJSON] = props.location.state ? useState(props.location.state.requestJSON) : useState(
        props.getJSON
    );

    const [rendered, setRendered] = useState(true);
  const [sourceData, setSourceData] = useState({});
  const [TopicGrain, setTopicGrain] = useState([]);
  const [TextGrain, setTextGrain] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rerun, setRerun] = useState("Filter Topic");
  const [rerunEnabled, setRerunEnabled] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      document.getElementById("export-container").style.display = "flex";
      document.getElementById("show-topic-modelling").style.display = "inline-block";
      document.getElementById("hide-topic-modelling").style.display = "none";
      !rendered ? null : useVisualData(requestJSON).then((source) => {
      setSourceData(source);
        setTopicGrain(source["Topic Grain"]);
        setTextGrain(source["Text Grain"]);
          props.sentrequest(source["Text Grain"])
          setRendered(false);
        document.getElementById("sent").classList.remove("nav-disabled")
        //console.log(source)

     setIsLoading(false);
    }).catch(error => {
        console.log(error)
        setOpenErrorPopup(true);
    })
      //setTextGrain[props.getJSON["Topic Grain"]]
      //setTopicGrain[props.getJSON["Text Grain"]]
      //setIsLoading(true)
  }, [requestJSON]);

  if (isLoading) {
    document.getElementById("overlay-main").style.display = "block";
  } else {
    document.getElementById("overlay-main").style.display = "none";
  }

    const handleDefinedTopic = (seedingData) => {
    let dataObj = Object.values(seedingData);
        if (dataObj.length > 0) {

      const seeds = dataObj.map((item) => ({
        seed_topic_names_list: item.top,
        seed_topic_list: item.keys,
      }));

            setRequestJSON({
      data: { seeds, review: props.location.state.requestJSON.data },
        typeofdata: "Seeding Data",
      });
        } else alert("Please enter some values");
  };

    const [reRunOption, setReRunOption] = useState("");
    const openRerunPopup = (reRunOption) => {
        setReRunOption(reRunOption);
        setOpen(true);
    }
    const closePopup = (option) => {
        if (option === "ok") {
            setOpen(false);
            if (reRunOption === "handleDefinedTopic") {
                handleDefinedTopic(topicObj)
            }
            else {
                handleReRun();
            }
        }
        else {
            setOpen(false);
        }
    }
    const closeErrorPopup = (option) => {
        setOpen(false);
        var address = location.href.split("#")[0] + "Home/Login";
        location.href = address;
    }

  const classes = useStyles();

  const [filterItem, setFilterItem] = useState("");

  const hasFilterItem = (item) => filterItem === item;

  const onTopicContainerItemClick = (item) => {
    hasFilterItem(item) ? setFilterItem("") : setFilterItem(item);
  };

  let TopicData = TopicGrain.map((item) => item.Topic_name);

  const topics = TopicData.map((item, index) => {
    let elementClass = classes.show;

    if (filterItem !== "" && !hasFilterItem(item)) {
      elementClass = classes.hide;
    }

    return (
      <div
        onClick={() => onTopicContainerItemClick(item)}
        className="topic"
        key={index}
      >
        <span className={elementClass}>{item}</span>
      </div>
    );
  });

  const onRemoveTopicClick = (item, id) => {
    removeTopicItems.push(item);
    document.getElementById(id).style.display = "none";
  };

    const handleReRun = () => {
    const filteredTopicGrains = sourceData["Topic Grain"].filter(
      (grainItem) => {
        return (
          removeTopicItems.findIndex(
            (rTItem) => rTItem === grainItem.Topic_name
          ) === -1
        );
      }
    );

    const filteredTextGrains = sourceData["Text Grain"].filter((grainItem) => {
      return (
        removeTopicItems.findIndex(
          (rTItem) => rTItem === grainItem.Dominant_Topic_Name
        ) === -1
      );
    });

    setTopicGrain(filteredTopicGrains);
    setTextGrain(filteredTextGrains);
  };

  const removeTopics = TopicData.map((item) => {
    const elementId = `rm-topic-${item.split(" ").join("-").toLowerCase()}`;

    return (
      <div id={elementId} className="topic" key={elementId}>
        <span>{item}</span>

        <span className={classes.closeButtonStyle}>
          <CloseIcon
            fontSize="inherit"
            onClick={() => onRemoveTopicClick(item, elementId)}
          />
        </span>
      </div>
    );
  });

  const [data, setData] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [topic, setTopic] = React.useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setData((data) => data.concat(topic));

    topicObj[topic] = {};
    topicObj[topic]["keys"] = keyword;
    topicObj[topic]["top"] = topic;
    topicObj[topic]["clicked"] = true;
    setKeyword("");
    setTopic("");
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleTopic = (e) => {
    setTopic(e.target.value);
  };

  const items = new Array(10).fill("sample");
  const itemsToDisplay = items.map((item) => item);

  const [isDefineTopicBtnClicked, changeDefineTopicBtn] = React.useState(false);
  const [isSelectTopicBtnClicked, changeSelectTopicBtn] = React.useState(false);

  const [showData, changeData] = React.useState([]);

  const handleDefineTopicBtnClick = () => {
    setRerun("Create Topic");
    setRerunEnabled(true);
    changeDefineTopicBtn(true);
    changeSelectTopicBtn(false);
  };

  const handleSelectTopicBtnClick = () => {
    setRerun("Filter Topic");
    setRerunEnabled(true);
    changeSelectTopicBtn(true);
    changeDefineTopicBtn(false);
  };

  const addComponent = () => {
    changeData((showData) => [...showData, ""]);
  };

  const removeComponent = (index) => {
    changeData((showData) => showData.filter((val, i) => i !== index));
  };

  const FilteredTopicGrains =
    filterItem !== ""
      ? TopicGrain.filter((grainItem) => hasFilterItem(grainItem.Topic_name))
      : TopicGrain;
  const FilteredTextGrains =
    filterItem !== ""
      ? TextGrain.filter((grainItem) =>
        hasFilterItem(grainItem.Dominant_Topic_Name)
      )
      : TextGrain;

  const refinedData = {
    "Topic Grain": FilteredTopicGrains,
    "Text Grain": FilteredTextGrains,
  };
  let card1 = refinedData["Text Grain"].length;
  let card2 = refinedData["Topic Grain"].length;

  let avg = 0;
  let sum = 0;

  refinedData["Topic Grain"].forEach(
    (item) => (sum += item.Topic_Perc_Contrib)
  );

  avg = (sum * 100) / refinedData["Topic Grain"].length;
  avg =
    refinedData["Text Grain"].length !== 0
      ? (Math.floor(avg * 100) / 100).toFixed(2)
      : 0;

  let card3 = avg;

  let card4 = isLoading ? 0 : "70%";

  const columns1 = [
    {
      Header: "Review",
      accessor: "text",
    },
    {
      Header: "Dominant topic name",
      accessor: "Dominant_Topic_Name",
    },
    {
      Header: "Topic Contribution (%)",
      accessor: "Topic_Perc_Contrib",
      Cell: row => (
        <div style={{ textAlign: "right" }}>{row.value}</div>
      )
    },
  ];

  const columns8 = [
    {
      Header: "Keywords",
      accessor: "keywords",
    },
    {
        Header: "Occurrences",
      accessor: "countOfId",
      Cell: row => (
        <div style={{ textAlign: "right" }}>{row.value}</div>
      )
    },
    {
      Header: "Weight (%)",
      accessor: "weight",
      Cell: row => (
        <div style={{ textAlign: "right" }}>{row.value}</div>
      )
    },
    ];
    return (
        <div
            id="topicmodelling-main"
            className={
                document.getElementById("sidenavbar-main") !== null &&
                    document.getElementById("sidenavbar-main").className === "nav-mini"
                    ? "minimization"
                    : "maximized"
            }
        >
            {open ? <PopupComponent
                showCancelButton={"false"}
                closePopup={closePopup}
                popupContent={["Re-running model will discard current data and process the report per new Topic mapping provided"]}
            /> : null}
            {openErrorPopup ? <PopupComponent
                closePopup={closeErrorPopup}
                showCancelButton={"false"}
                popupContent={["Model failed to process data, please try again after sometime."]}
            /> : null}
            <div id="pdf-container">
                <div id="card-container">
                    <CardComponent
                        Value={card1}
                        Title="Number of responses"
                        Tooltip="Number of responses"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                            <VisualTooltip placement="top-end" arrow title={infoData.info11}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                    />
                    <CardComponent
                        Value={card2}
                        Title="Number of topics"
                        Tooltip="Number of topics"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info12}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                    />
                    <CardComponent
                        Value={card3 + "%"}
                        Title="Avg. contribution score"
                        Tooltip="Avg. contribution score"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info13}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                    />
                    <CardComponent
                        Value={card4}
                        Title="Topic strength"
                        Tooltip="Topic strength"
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
                            <VisualTooltip placement="top-end" arrow title={infoData.info14}>
                                <InfoIcon className={classes.iconSize} style={{ fill: '#3a31aa' }} />
                            </VisualTooltip>
                        </span>}
                    />
                </div>
                <div id="topic-heading">Topics    <Link to='modify' style={{ textDecoration: 'none', color: '#3a31aa', float: 'right', cursor: 'pointer' }}><img src={config.edit} height='14px' width='20px' />  Modify Topics</Link></div>
                <div id="topic-container">{topics}</div>
                <div className="grid-wrapper">
                    <div className="grid-heading grid-title1">
                        Common Topics{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info1}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>

                    <div className="grid-box grid-item1">
                        <ChartComponent
                            data={getData(
                                refinedData,
                                "Common Categories",
                                requestJSON.typeofdata
                            )}
                            type="bar"
                            color={{ primary: "#FDA175" }}
                            dataKey={["Topic names", "Number of comments tagged"]}
                            layout="vertical"
                        />
                    </div>
                    <div className="grid-heading grid-title2">
                        Bigram/Trigram Key-phrases Under Topics{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info2}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item2">
                        <ChartComponent
                            data={getData(
                                refinedData,
                                "Bigram-Trigram Topic under Categories",
                                requestJSON.typeofdata
                            )}
                            type="bar"
                            color={{ primary: "#F1C6DD" }}
                            dataKey={["Bigrams/Trigrams text", "Weightage (%)"]}
                            layout="vertical"
                        />
                    </div>
                    <div className="grid-heading grid-title3">
                        Word Cloud{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info3}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item3">
                        <ReactWordcloud
                            words={getData(refinedData, "Word Cloud", requestJSON.typeofdata)}
                            options={config.wordCloudOptions}
                        />
                    </div>
                    <div className="grid-heading grid-title4">
                        Strongest Topics (Average Contribution Score){" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info4}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item4">
                        <ChartComponent
                            data={getData(
                                refinedData,
                                "Strongest Topics",
                                requestJSON.typeofdata
                            )}
                            type="bar"
                            color={{ primary: "#A8B2DF" }}
                            dataKey={["Topic names", "Weightage (%)"]}
                            layout="vertical"
                        />
                    </div>
                    <div className="grid-heading grid-title5">
                        Keyword Counts & Importance{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info5}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item5">
                        <ChartComponent
                            data={getData(
                                refinedData,
                                "Topic Distribution",
                                requestJSON.typeofdata
                            )}
                            type="GroupedBar"
                            color={{ primary: "#BACCF3", secondary: "#6B87C3" }}
                            dataKey={["Keyword text", "Number of parent topics", "Weights across the topics (%)"]}
                            layout="horizontal"
                        />
                    </div>
                    <div className="grid-heading grid-title6">
                        Topics Distribution Over Response{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info6}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item6">
                        <ChartComponent
                            data={getData(refinedData, "last Chart", requestJSON.typeofdata)}
                            type="linebar"
                            color={{ primary: "#70A3AC", secondary: "#8884d8" }}
                            dataKey={["TopicName", "Number of responses", "Topic contribution (%)"]}
                            layout="horizontal"
                        />
                    </div>
                    <div className="grid-heading grid-title7">
                        Feedback Comments{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info7}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item7">
                        <TableComponent
                            data={getData(
                                refinedData,
                                "Feedback Comments",
                                requestJSON.typeofdata
                            )}
                            columns={columns1}
                        />
                    </div>
                    <div className="grid-heading grid-title8">
                        All Keywords Under Topic{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info8}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item8">
                        <TableComponent
                            data={getData(
                                refinedData,
                                "All keywords under Category",
                                requestJSON.typeofdata
                            )}
                            columns={columns8}
                        />
                    </div>
                </div>
            </div>
            <section id='modify'><div id="topic-heading-modify">Looking for something else? Modify your topics here</div></section>
            <div className="topic-btn">
                <div>
                    <button
                        className={`createfilterbutton button ${
                            isDefineTopicBtnClicked
                                ? classes.buttonactive
                                : classes.buttoninactive
                            }`}
                        onClick={handleDefineTopicBtnClick}
                    >
                        Create Topic
          </button>
                    <button
                        className={`createfilterbutton button ${
                            isSelectTopicBtnClicked
                                ? classes.buttonactive
                                : classes.buttoninactive
                            }`}
                        onClick={handleSelectTopicBtnClick}
                    >
                        Filter Topic
          </button>
                </div>
                <div id="rerun-icon">
                    <div
                        id="rerun"
                        onClick={() =>
                            rerun === "Create Topic"
                                ? openRerunPopup("handleDefinedTopic") //handleDefinedTopic(topicObj)
                                : openRerunPopup("handleReRun")//handleReRun()
                        }
                        style={{ display: rerunEnabled ? "flex" : "none" }}
                    >
                        <img className="icon-size" src={config.rerun} alt="upload" />
                        <span className="icon-text"> Re-run</span>
                    </div>
                </div>
            </div>
            <div id="create-topic-main">
                {isDefineTopicBtnClicked ? (
                    <>
                        {" "}
                        <form onSubmit={handleAdd}>
                            <div className="input-area">
                                <span className="input-text">Keywords</span>
                                <input
                                    className="input-area1"
                                    value={keyword}
                                    onChange={(e) => handleKeyword(e)}
                                    required
                                    placeholder="Enter comma separated values for keywords"
                                />
                                <span className="input-text">Topic </span>
                                <input
                                    className="input-area1"
                                    value={topic}
                                    required
                                    onChange={(e) => handleTopic(e)}
                                    placeholder="Enter here (maximum length - 20 characters)"
                                    maxlength="20"
                                />
                                <button
                                    type="submit"
                                    className={`button keyword-topic-add ${classes.buttonactive}`}
                                >
                                    Add
                </button>
                            </div>
                        </form>
                        <div id="display-container">
                            {data.map((value, index) => {
                                return <FunctionalityComponent value={value} obj={topicObj} key={index} />;
                            })}
                        </div>
                    </>
                ) : null}
                {isSelectTopicBtnClicked ? (
                    <div>
                        <div id="select-topic">{removeTopics}</div>
                    </div>
                ) : null}
            </div>

            <div id="footer-textanalytics">
                <p>
                    &#169; <span id="copyright_year">{new Date().getFullYear()}</span>
                    <a target="_blank" href="https://maqsoftware.com"><b> MAQ Software</b></a>
                      . All Rights Reserved.
                      <span className="link-privacy"><a target="_blank" href="https://maqsoftware.com/privacystatement"> Privacy Statement | </a></span>
                    <span className="link-privacy"><a target="_blank" href="https://maqsoftware.com/termsofservice">Terms of Service</a></span>
                </p>
            </div>
        </div>
    );
}
export default TopicModelling;
