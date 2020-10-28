import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChartComponent from './ChartComponent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AreaChart, Legend, Area, XAxis, YAxis, Tooltip, CartesianGrid, linearGradient, ResponsiveContainer, Bar } from 'recharts';
import HelpIcon from '@material-ui/icons/Help';
import { BarChart } from 'recharts';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../styles/SentimentAnalysis.css';
import SingleColumnTable from './SingleColumnTable';
import ReactWordcloud from "react-wordcloud";
import config from "../../react/config";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip1 from "@material-ui/core/Tooltip";
import { infoData } from '../constants/InfoText';
import { withStyles } from "@material-ui/core/styles";
import TableComponent from "./TableComponent";
const useStyles1 = makeStyles({
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
        verticalAlign: "top",
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
}))(Tooltip1);
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',

        backgroundColor: theme.palette.background.paper,

    },


}));

export default function ScrollableTabsButtonForce(props) {
    const classes = useStyles();
    const classes1 = useStyles1();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit" >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    width='100%'
                >

                    <Tab label="All Comments" icon={<FavoriteIcon />} {...a11yProps(0)} style={{ width: '25%' }} />
                    <Tab label="Positive" icon={<ThumbUp />} {...a11yProps(1)} style={{ width: '25%' }} />
                    <Tab label="neutral" icon={<HelpIcon />} {...a11yProps(2)} style={{ width: '25%' }} />

                    <Tab label="Negative" icon={<ThumbDown />} {...a11yProps(3)} style={{ width: '25%' }} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} style={{ backgroundColor: '#f7f6fe' }}>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{width:'50%', marginLeft: '0', marginRight: '6px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info15}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                    <div className='column heading' style={{ width:'50%',paddingLeft:'13px', marginLeft: '6px', marginRight: '0px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info16}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container" >

                    <div className='column table' style={{ width: '50%', margin: '0px 12px 0px 0px' }}>

                        <SingleColumnTable
                            data={props.commentsAll}
                            columns={[{
                                "Header": " Top 5  Reviews",
                                "accessor": "text"
                            }]}
                            style={{ height: '98%' }}
                        />
                    </div>
                    <div className='column table' style={{ width: '50%', backgroundColor: 'white', margin: '0px 0px 0px 12px' }}>
                        <ResponsiveContainer>
                            <AreaChart width={600} height={300} data={props.dataArea}
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
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign='top' />


                                <Area type="monotone" dataKey="Positive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                <Area type="monotone" dataKey="Negative" stroke="red" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="Neutral" stroke="orange" fillOpacity={1} fill="url(#colorAm)" />

                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{width:'30%', marginLeft: '0', marginRight: '2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Up?  <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info17}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div><div className='column heading' style={{width:'30%', marginLeft: '2.5%',marginRight:'2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>Word Cloud <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info20}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span> </div><div className='column heading' style={{width:'30%', marginLeft: '0', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Down? <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info18}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">

                    <div className='column graph' style={{ margin: '0px 12px 0px 0px' }}>




                        <ChartComponent
                            data={props.short_tab_pos}
                            type="bar"
                            color={{ primary: "green" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />


                    </div>
                    <div className='column' style={{ margin: '0px 12px 0px 12px' }} >
                        <ReactWordcloud
                            words={props.wordsdata}
                            options={config.wordCloudOptions}
                        />

                    </div>
                    <div className='column graph' style={{ margin: '0px 0px 0px 12px' }}>

                        <ChartComponent
                            data={props.short_tab_neg}
                            type="bar"
                            color={{ primary: "#e16d11" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />
                    </div>

                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ marginLeft: '0', marginRight: '12px', textAlign: 'left', backgroundColor: 'transparent' }}>Feedback Comments <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info19}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className='detail-view'>

                    <TableComponent
                        data={props.table_data}
                        columns={[{
                            "Header": "Reviews",
                            "accessor": "text"
                        },
                        {
                            "Header": "Sentiment",
                            "accessor": "Dominant_Topic_Name"

                        },
                        {
                            "Header": "Sentiment Score (%)",
                            "accessor": "Topic_Perc_Contrib",
                            Cell: row => (
                                <div style={{ textAlign: "right" }}>{row.value}</div>
                            )
                        }]}
                    />
                </div>


            </TabPanel>
            <TabPanel value={value} index={2} style={{ backgroundColor: '#f7f6fe' }}>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ width:'50%', marginLeft: '0', marginRight: '6px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info15}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                    <div className='column heading' style={{ width:'50%',paddingLeft:'13px', marginLeft: '6px', marginRight: '0px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info16}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column table' style={{ height: '300px', width: '50%', backgroundColor: 'white', margin: '0px 12px 0px 0px' }}>
                        <SingleColumnTable
                            data={props.commentsNeutral}
                            columns={[{
                                "Header": " Top 5 Neutral Reviews",
                                "accessor": "text"
                            }]}
                            style={{ height: '300px' }}
                        />
                    </div>
                    <div className='column table' style={{ width: '50%', backgroundColor: 'white', margin: '0px 0px 0px 12px' }}>

                        <ResponsiveContainer >
                            <AreaChart width={730} height={250} data={props.dataArea}
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
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign='top' />
                                <Area type="monotone" dataKey="Neutral" stroke="orange" fillOpacity={1} fill="url(#colorAm)" />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>
                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ width:'30%', marginLeft: '0', marginRight: '2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Up?  <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info17}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div><div className='column heading' style={{ width:'30%', marginLeft: '2.5%',marginRight:'2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>Word Cloud <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info20}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span> </div><div className='column heading' style={{ width:'30%', marginLeft: '0', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Down? <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info18}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column graph' style={{ margin: '0px 12px 0px 0px' }}>
                        {    /*<button style={{border:'none',backgroundColor:'white'}}><img src={config.upward}/></button>
          <ChartComponent
            data={data_pos}
            type="bar"
            color={{ primary: "#FDA175" }}
            dataKey={["Topic names", "Number of comments tagged"]}
            layout="vertical"
                    />*/}


                        <ChartComponent
                            data={props.short_tab_pos}
                            type="bar"
                            color={{ primary: "green" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />

                    </div>
                    <div className='column' style={{ margin: '0px 12px 0px 12px' }} >
                        <ReactWordcloud
                            words={props.wordsdata}
                            options={config.wordCloudOptions}
                        />

                    </div>
                    <div className='column graph' style={{ margin: '0px 0px 0px 12px' }}>
                        <ChartComponent
                            data={props.short_tab_neg}
                            type="bar"
                            color={{ primary: "#e16d11" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />
                    </div>

                </div>

                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ marginLeft: '0', marginRight: '12px', textAlign: 'left', backgroundColor: 'transparent' }}>Feedback Comments <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info23}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className='detail-view'>

                    <TableComponent
                        data={props.table_data_neu}
                        columns={[{
                            "Header": "Reviews",
                            "accessor": "text"
                        },
                        {
                            "Header": "Sentiment",
                            "accessor": "Dominant_Topic_Name"

                        },
                        {
                            "Header": "Sentiment Score (%)",
                            "accessor": "Topic_Perc_Contrib",
                            Cell: row => (
                                <div style={{ textAlign: "right" }}>{row.value}</div>
                            )
                        }]}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{width:'50%', marginLeft: '0', marginRight: '6px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info15}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                    <div className='column heading' style={{ width:'50%',paddingLeft:'13px', marginLeft: '6px', marginRight: '0', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info16}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column table' style={{ width: '50%', backgroundColor: 'white', margin: '0px 12px 0px 0px' }}>
                        <SingleColumnTable
                            data={props.commentsNegative}
                            columns={[{
                                "Header": " Top 5 Negative Reviews",
                                "accessor": "text"
                            }]}
                            style={{ height: '300px' }}
                        />
                    </div>
                    <div className='column table' style={{ width: '50%', backgroundColor: 'white', margin: '0px 0px 0px 12px' }}>
                        <ResponsiveContainer>
                            <AreaChart width={730} height={250} data={props.dataArea}
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
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign='top' />
                                <Area type="monotone" dataKey="Negative" stroke="red" fillOpacity={1} fill="url(#colorUv)" />

                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ width:'30%', marginLeft: '0', marginRight: '2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Up?  <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info17}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div><div className='column heading' style={{width:'30%', marginLeft: '2.5%',marginRight:'2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>Word Cloud <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info20}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span> </div><div className='column heading' style={{ width:'30%', marginLeft: '0', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Down? <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info18}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column graph' style={{ margin: '0px 12px 0px 0px' }}>
                        {    /*<button style={{border:'none',backgroundColor:'white'}}><img src={config.upward}/></button>
          <ChartComponent
            data={data_pos}
            type="bar"
            color={{ primary: "#FDA175" }}
            dataKey={["Topic names", "Number of comments tagged"]}
            layout="vertical"
                    />*/}


                        <ChartComponent
                            data={props.short_tab_pos}
                            type="bar"
                            color={{ primary: "green" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />

                    </div>
                    <div className='column' style={{ margin: '0px 12px 0px 12px' }} >
                        <ReactWordcloud
                            words={props.wordsdataNeg}
                            options={config.wordCloudOptions}
                        />

                    </div>
                    <div className='column graph' style={{ margin: '0px 0px 0px 12px' }}>
                        <ChartComponent
                            data={props.short_tab_neg}
                            type="bar"
                            color={{ primary: "#e16d11" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />
                    </div>

                </div>

                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ marginLeft: '0', marginRight: '12px', textAlign: 'left', backgroundColor: 'transparent' }}>Feedback Comments <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info22}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className='detail-view'>

                    <TableComponent
                        data={props.table_data_neg}
                        columns={[{
                            "Header": "Reviews",
                            "accessor": "text"
                        },
                        {
                            "Header": "Sentiment",
                            "accessor": "Dominant_Topic_Name"

                        },
                        {
                            "Header": "Sentiment Score (%)",
                            "accessor": "Topic_Perc_Contrib",
                            Cell: row => (
                                <div style={{ textAlign: "right" }}>{row.value}</div>
                            )
                        }]}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{width:'50%', marginLeft: '0', marginRight: '6px', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info15}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                    <div className='column heading' style={{ width:'50%',paddingLeft:'13px', marginLeft: '6px', marginRight: '0', textAlign: 'left', backgroundColor: 'transparent' }}>Top 5 Comments with Strongest Sentiment<span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info16}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column table' style={{ height: '300px', width: '50%', backgroundColor: 'white', margin: '0px 12px 0px 0px' }}>
                        <SingleColumnTable
                            data={props.commentsPositive}
                            columns={[{
                                "Header": " Top 5 Positive Reviews",
                                "accessor": "text"
                            }]}
                            style={{ height: '300px' }}
                        />
                    </div>
                    <div className='column table' style={{ width: '50%', backgroundColor: 'white', margin: '0px 0px 0px 12px' }}>
                        <ResponsiveContainer>
                            <AreaChart width={730} height={250} data={props.dataArea}
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
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />

                                <Legend verticalAlign='top' />
                                <Area type="monotone" dataKey="Positive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />


                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ width:'30%', marginLeft: '0', marginRight: '2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Up?  <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info17}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div><div className='column heading' style={{ width:'30%', marginLeft: '2.5%',marginRight:'2.5%', textAlign: 'left', backgroundColor: 'transparent' }}>Word Cloud <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info20}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span> </div><div className='column heading' style={{width:'30%', marginLeft: '0', textAlign: 'left', backgroundColor: 'transparent' }}>What is Driving Sentiment Down? <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info18}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className="card-container">
                    <div className='column graph' style={{ margin: '0px 12px 0px 0px' }}>
                        {    /*<button style={{border:'none',backgroundColor:'white'}}><img src={config.upward}/></button>
          <ChartComponent
            data={data_pos}
            type="bar"
            color={{ primary: "#FDA175" }}
            dataKey={["Topic names", "Number of comments tagged"]}
            layout="vertical"
                    />*/}


                        <ChartComponent
                            data={props.short_tab_pos}
                            type="bar"
                            color={{ primary: "green" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />

                    </div>
                    <div className='column' style={{ margin: '0px 12px 0px 12px' }} >
                        <ReactWordcloud
                            words={props.wordsdataPos}
                            options={config.wordCloudOptions}
                        />

                    </div>
                    <div className='column graph' style={{ margin: '0px 0px 0px 12px' }}>
                        <ChartComponent
                            data={props.short_tab_neg}
                            type="bar"
                            color={{ primary: "#e16d11" }}
                            dataKey={["text", "Frequency"]}
                            layout="vertical"
                        />
                    </div>

                </div>
                <div className="card-container" style={{ marginTop: '0px !important' }}>
                    <div className='column heading' style={{ marginLeft: '0', marginRight: '12px', textAlign: 'left', backgroundColor: 'transparent' }}>Feedback Comments <span className={classes1.infoIcon}  >
                        <VisualTooltip placement="top-end" arrow title={infoData.info21}>
                            <InfoIcon className='tool' />
                        </VisualTooltip>
                    </span>  </div>
                </div>
                <div className='detail-view'>

                    <TableComponent
                        data={props.table_data_pos}
                        columns={[{
                            "Header": "Reviews",
                            "accessor": "text"
                        },
                        {
                            "Header": "Sentiment",
                            "accessor": "Dominant_Topic_Name"

                        },
                        {
                            "Header": "Sentiment Score (%)",
                            "accessor": "Topic_Perc_Contrib",
                            Cell: row => (
                                <div style={{ textAlign: "right" }}>{row.value}</div>
                            )
                        }]}
                    />
                </div>
            </TabPanel>
        </div>
    );
}
