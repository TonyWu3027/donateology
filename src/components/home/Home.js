import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const mainFeaturedPost = {
  title: 'China’s Doctors, Fighting the Coronavirus, Beg for Masks',
  description:
    "Confronting a viral epidemic with a scant supply of protective equipment, more than 1,700 Chinese medical workers have already been infected, and six have died.",
  image: 'https://static01.nyt.com/images/2020/02/14/world/00China-Frontline01/00China-Frontline01-facebookJumbo.jpg',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Mao-Style Oppression in China Ensues',
    date: 'Feb 15',
    description:
      'China has flooded cities and villages with battalions of neighborhood busybodies, uniformed volunteers and Communist Party representatives to carry out one of the biggest social control campaigns in history.',
    image: 'https://static01.nyt.com/images/2020/02/15/business/15china-tracking-1/15china-tracking-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    imageText: 'Image Text',
  },
  {
    title: 'Over 1,700 frontline medics infected with coronavirus in China',
    date: 'Feb 14',
    description:
      'Ning Zhu, a nurse in Wuhan, the central Chinese city at the heart of a deadly coronavirus outbreak, is restless. Instead of helping on the frontlines, she has been under self-quarantine at home for weeks..',
    image: 'https://cdn.cnn.com/cnnnext/dam/assets/200214124607-11-coronavirus-0212-wuhan-exlarge-169.jpg',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

console.log(post1)
const sidebar = {
  title: 'About',
  description:
    'We are a team of 1st year undergraduate students from ICL, UCL, & Oxford, our main objective for this hackathon is to contribute a secure and efficient way to facilitate the transaction of medical equipment between Chinese Hospitals. Some of the government officials are corrupt and inhumane, refusing to distribute masks in order to make a profit which is unreasonable with the current state of the outbreak. Hopefully our project will be able to ease the life of the brave frontline medics and doctors risking their lives for patients.',
  archives: [
    { title: 'COVID-19 Infection', url: 'https://www.worldometers.info/coronavirus/coronavirus-cases/' },
    { title: 'COVID-19 Mortality Rate ', url: 'https://www.worldometers.info/coronavirus/coronavirus-death-rate/' },
    { title: 'COVID-19 Symptoms', url: 'https://www.worldometers.info/coronavirus/coronavirus-symptoms/' },
    { title: 'COVID-19 Death Toll', url: 'https://www.worldometers.info/coronavirus/coronavirus-death-toll/' },
    { title: 'COVID-19 Incubation', url: 'https://www.worldometers.info/coronavirus/coronavirus-incubation-period/' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog"/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Personal Anecdotes" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Disclaimer" description="All proceeds go to respective organisations, we do not make any profits." />
    </React.Fragment>
  );
}
