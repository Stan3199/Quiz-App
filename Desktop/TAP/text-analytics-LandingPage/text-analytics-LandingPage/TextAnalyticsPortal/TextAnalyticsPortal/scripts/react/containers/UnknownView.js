import React, { useState, useEffect } from "react";
import "../../styles/TopicModelling.css";
import ReactWordcloud from "react-wordcloud";
import PopupComponent from '../components/PopupComponent.js';
import CardComponent from "../components/CardComponent";
import ChartComponent from "../components/ChartComponent";
import TableComponent from "../components/TableComponent";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import DoneIcon from "@material-ui/icons/Done";
import config from "../config.js";
import { getData } from "../hooks/getData";
import { useVisualData } from "../hooks/useVisualData";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";
import UnknownCardComponent from "../components/UnknownCardComponent";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { infoData } from '../constants/InfoText'

const useStyles = makeStyles({
    show: {
        opacity: 0.2,
    },
    hide: {
        opacity: 1,
    },
    buttonactive: {
        backgroundColor: "#534e9b",
    },
    buttoninactive: {
        backgroundColor: "#8279CF",
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


let removeTopicItems = [];

const UnknownView = (props) => {
    const classes = useStyles();
    document.getElementById("item-topicmodelling") !== null
        ?
        document.getElementById("item-topicmodelling").getElementsByTagName("a")[0].classList.add("nav-item-active")
        : null;
    document.getElementById("item-topicmodelling") !== null
        ?
        document.getElementById("item-topicmodelling").classList.add("nav-item-visible")
        : null;
    document.getElementById("item-topicmodelling") !== null
        ?
        document.getElementById("item-topicmodelling").classList.remove("nav-disabled")
        : null;
    const [requestJSON, setRequestJSON] = useState(
        props.location.state.requestJSON
    );
    const [filterItem, setFilterItem] = useState("");
    const [sourceData, setSourceData] = useState({});
    const [TopicGrain, setTopicGrain] = useState([]);
    const [TextGrain, setTextGrain] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rerun, setRerun] = useState("Rename Topic");
    const [redirectProps, setRedirectProps] = useState({});
    const [rerunEnabled, setRerunEnabled] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
    const [reRunOption, setReRunOption] = useState("");
    const openRerunPopup = (reRunOption) => {
        setReRunOption(reRunOption);
        setOpen(true);
    }

    const closeErrorPopup = (option) => {
        setOpen(false);
        var address = location.href.split("#")[0] + "Home/Login";
        location.href = address;
    }
    const closePopup = (option) => {
        if (option === "ok") {
            setOpen(false);
            if (rerun === "Rename Topic") {
                handleRerunOnRename();
            }
            else {
                handleRerun();
            }
        }
        else {
            setOpen(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        document.getElementById("export-container").style.display = "flex";
        document.getElementById("show-topic-modelling").style.display = "inline-block";
        document.getElementById("hide-topic-modelling").style.display = "none";
        document.getElementById("export-container").style.display = "flex";
        useVisualData(requestJSON).then((source) => {
            setSourceData(source);
            setTopicGrain(source["Topic Grain"]);
            setTextGrain(source["Text Grain"]);
            props.sentrequest(source["Text Grain"])
            document.getElementById("sent").classList.remove("nav-disabled")
            setIsLoading(false);
        }).catch(error => {
            setOpenErrorPopup(true);
        });
    }, [requestJSON]);

    const handleRerun = () => {

        const seedingDataSource = sourceData["Topic Grain"].filter((grainItem) => {
            return (
                removeTopicItems.findIndex(
                    (rTItem) => rTItem === grainItem.Topic_name
                ) === -1
            );
        });

        const seeds = seedingDataSource.map((item) => ({
            seed_topic_names_list: item.Topic_name,
            seed_topic_list: JSON.stringify(Object.keys(item["Keywords"][0])),
        }));

        const review = requestJSON.data["Response"].map((item) => ({
            review: item["Response"],
        }));

        const newRequestJSON = {
            data: { seeds, review },
            typeofdata: "Seeding Data",
        };

        setRedirectProps({
            pathname: "/TopicModelling",
            state: { requestJSON: newRequestJSON },
        });
    };

    const FilteredTopicGrains =
        filterItem !== ""
            ? TopicGrain.filter((grainItem) => grainItem.Topic_name === filterItem)
            : TopicGrain;

    const FilteredTextGrains =
        filterItem !== ""
            ? TextGrain.filter(
                (grainItem) => grainItem.Dominant_Topic_Name === filterItem
            )
            : TextGrain;

    const refinedData = {
        "Topic Grain": FilteredTopicGrains ? FilteredTopicGrains : [],
        "Text Grain": FilteredTextGrains ? FilteredTextGrains : [],
    };

    if (isLoading) {
        document.getElementById("overlay-main").style.display = "block";
    } else {
        document.getElementById("overlay-main").style.display = "none";
    }

    const [isldavisloaded, setldavisflag] = useState(false);



    let card1 = refinedData["Text Grain"].length;
    let card2 = refinedData["Topic Grain"].length;

    let avg = 0;
    let sum = 0;

    refinedData["Topic Grain"].forEach(
        (item) => (sum += item.Topic_Perc_Contrib)
    );

    avg = (sum * 100) / refinedData["Topic Grain"].length;
    avg = refinedData["Topic Grain"].length
        ? (Math.floor(avg * 100) / 100).toFixed(2)
        : 0;

    let card3 = avg;
    let card4 = isLoading ? 0 : "70%";

    let TopicData = TopicGrain.map((item) => item.Topic_name);

    const onRemoveTopicClick = (item, id) => {
        removeTopicItems.push(item);
        document.getElementById(id).style.display = "none";
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

    const items = new Array(10).fill("sample");
    const itemsToDisplay = items.map((item) => item);

    const [isDefineTopicBtnClicked, changeDefineTopicBtn] = React.useState(false);
    const [isSelectTopicBtnClicked, changeSelectTopicBtn] = React.useState(false);

    const handleDefineTopicBtnClick = () => {
        setRerun("Rename Topic");
        setRerunEnabled(true);
        changeDefineTopicBtn(true);
        changeSelectTopicBtn(false);
    };

    const handleFilterTopicBtnClick = () => {
        setRerun("Filter Topic");
        setRerunEnabled(true);
        changeSelectTopicBtn(true);
        changeDefineTopicBtn(false);
    };

    const handleChange = (selectedDropdownOptions) => {
        setFilterItem(selectedDropdownOptions["value"]);
        setOldTopicName(selectedDropdownOptions["value"]);
    };

    const options = TopicGrain.map((item) => ({
        value: item.Topic_name,
        label: item.Topic_name,
    }));

    const [renamedTopics, setRenamedTopics] = useState([]);
    const [oldTopicName, setOldTopicName] = useState("");
    const [newTopicName, setNewTopicName] = useState("");

    const selectTopicForRenameFromDropdown = ({ value }) => {
        setOldTopicName(value);
    };

    const SelectTopicForRenameDropdownComponent = () => (
        <Select
            className="root"
            placeholder="Select Topic"
            options={options}
            value={{ label: oldTopicName }}
            onChange={selectTopicForRenameFromDropdown}
        />
    );

    const handleNewTopicNameInput = (value) => {
        setNewTopicName(value);
    };

    const setRenamedPair = () => {
        if (oldTopicName.length < 1 || newTopicName.length < 1) {
            return;
        }
        setRenamedTopics([...renamedTopics, { oldTopicName, newTopicName }]);
        setOldTopicName("");
        setNewTopicName("");
    };

    const handleRerunOnRename = () => {

        const sourceTopicGrain = sourceData["Topic Grain"].map((item) => {
            const oldTopicItem = renamedTopics.find(
                (topic) => topic.oldTopicName === item.Topic_name
            );

            if (oldTopicItem !== undefined) {
                item.Topic_name = oldTopicItem.newTopicName;
            }

            return item;
        });

        const sourceTextGrain = sourceData["Text Grain"].map((item) => {
            const oldTopicItem = renamedTopics.find(
                (topic) => topic.oldTopicName === item.Dominant_Topic_Name
            );

            if (oldTopicItem !== undefined) {
                item.Dominant_Topic_Name = oldTopicItem.newTopicName;
            }

            return item;
        });

        let renamedFilterItem = ""

        if (filterItem.length > 1) {
            let himanshu = renamedTopics.find(item => item.oldTopicName === filterItem)
            if (himanshu != undefined) {
                renamedFilterItem = himanshu.newTopicName
            }

            setFilterItem(renamedFilterItem)
        }



        setSourceData({
            "Topic Grain": sourceTopicGrain,
            "Text Grain": sourceTextGrain,
        });
        setRenamedTopics([])
        setTopicGrain(sourceTopicGrain);
        setTextGrain(sourceTextGrain);
    };

    const DropdownComponent = () => (
        <Select
            className="root"
            placeholder="Select Topic"
            options={options}
            value={{ label: filterItem }}
            closeMenuOnSelect={false}
            onChange={handleChange}
        />
    );

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
    let data8 = [];

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

    if (Object.keys(redirectProps).length > 0) {
        return <Redirect to={redirectProps} />;
    }

    const onRemoveRenamedTopicClick = (item, id) => {
        const NewTopics = renamedTopics.filter(
            (rItem) => rItem.oldTopicName !== item
        );
        setRenamedTopics(NewTopics);
        document.getElementById(id).style.display = "none";
    };



    const renamedTopicObjectShown = renamedTopics.map((item) => {
        const elementId = `rm-topic-${item["oldTopicName"]
            .split(" ")
            .join("-")
            .toLowerCase()}`;

        return (
            <div id={elementId} className="topic" key={elementId}>
                <span>{`${item["oldTopicName"]}: ${item.newTopicName}`}</span>
                <span className={classes.closeButtonStyle}>
                    <CloseIcon
                        fontSize="inherit"
                        onClick={() =>
                            onRemoveRenamedTopicClick(item["oldTopicName"], elementId)
                        }
                    />
                </span>
            </div>
        );
    });

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
                closePopup={closePopup}
                showCancelButton={"false"}
                popupContent={rerun === "Rename Topic" ? ["Re-running model will discard current data and process the report per new Topic mapping provided"] : ["We recommend you rename your topics, if needed, before leaving this page. You won't be able to do it afterwards. Click okay if you want to continue with your changes."]}
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
                        Image={<span className={classes.infoIcon} style={{ position: 'absolute', right: '10px', top: '10px' }} >
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

                <div className="text" id="select-topic-top">
                    <span id="topic-heading-select"> Select a topic</span>
                    <DropdownComponent />
                </div>

                <div className="grid-wrapper-one">
                    <div className="grid-heading grid-title9">
                        Best Reponse To Describe Topic{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info10}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box-one grid-item9">
                        <p>{getData(refinedData, "Dominant Text", requestJSON.typeofdata)}</p>
                    </div>
                    <div className="grid-box-one grid-item10">
                        <UnknownCardComponent refinedData={refinedData} />
                    </div>
                    <div className="grid-heading grid-title11">
                        Bigram/Trigram Key-phrases Under Topics{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info2}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item11">
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
                    <div className="grid-heading grid-title12">Word Cloud{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info3}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span></div>
                    <div className="grid-box grid-item12">
                        <ReactWordcloud
                            words={getData(refinedData, "Word Cloud", requestJSON.typeofdata)}
                            options={config.wordCloudOptions}
                        />
                    </div>
                    <div className="grid-heading grid-title13">
                        Keyword Counts & Importance {" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info5}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item13">
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
                    <div className="grid-heading grid-title14">
                        Topics Distribution Over Response{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info6}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item14">
                        <ChartComponent
                            data={getData(refinedData, "last Chart", requestJSON.typeofdata)}
                            type="linebar"
                            color={{ primary: "#70A3AC", secondary: "#8884d8" }}
                            dataKey={["TopicName", "Number of responses", "Topic contribution (%)"]}
                            layout="horizontal"
                        />
                    </div>
                    <div className="grid-heading grid-title15">
                        Feedback Comments{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info7}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item15">
                        <TableComponent
                            data={getData(
                                refinedData,
                                "Feedback Comments",
                                requestJSON.typeofdata
                            )}
                            columns={columns1}
                        />
                    </div>
                    <div className="grid-heading grid-title16">
                        All Keywords Under Topic{" "}
                        <span className={classes.infoIcon}  >
                            <VisualTooltip placement="top-end" arrow title={infoData.info8}>
                                <InfoIcon className={classes.iconSize} />
                            </VisualTooltip>
                        </span>
                    </div>
                    <div className="grid-box grid-item16">
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
            <div id="topic-heading-modify">Looking for something else? Modify your topics here</div>
            <div className="topic-btn">
                <div>
                    <button
                        className={`button ${
                            isDefineTopicBtnClicked
                                ? classes.buttonactive
                                : classes.buttoninactive
                            }`}
                        onClick={handleDefineTopicBtnClick}
                    >
                        Rename Topic
          </button>
                    <button
                        className={`button ${
                            isSelectTopicBtnClicked
                                ? classes.buttonactive
                                : classes.buttoninactive
                            }`}
                        onClick={handleFilterTopicBtnClick}
                    >
                        Filter Topic
          </button>
                </div>
                <div id="rerun-icon">
                    <div
                        id="rerun"
                        onClick={() =>
                            rerun === "Rename Topic" ? openRerunPopup("handleRerunOnRename") : openRerunPopup("handleRerun")
                        }
                        style={{ display: rerunEnabled ? "flex" : "none" }}
                    >
                        <img className="icon-size" src={config.rerun} alt="upload" />
                        <span className="icon-text"> Re-run</span>
                    </div>
                </div>
            </div>
            <div style={{ padding: 15 }}>
                {isDefineTopicBtnClicked ? (
                    <>
                        <div className="input-area">
                            <span className="input-text1"> Selected topic</span>
                            <SelectTopicForRenameDropdownComponent />
                            <span className="input-text1"> Renamed topic </span>
                            <input
                                className="input-area1"
                                onChange={(event) =>
                                    handleNewTopicNameInput(event.target.value)
                                }
                                value={newTopicName}
                                placeholder="Enter here (maximum length - 20 characters)"
                                maxlength="20"
                            ></input>
                            <DoneIcon onClick={() => setRenamedPair()} />
                        </div>
                        <div id="select-topic">{renamedTopicObjectShown}</div>
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
};

export default UnknownView;
