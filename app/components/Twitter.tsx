import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, Image, Linking } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { localeString } from '../locales';
import { colors } from '../styles/App.style';
import Moment from 'moment';
import Svg, { G, Path } from 'react-native-svg';
import Carousel from 'react-native-snap-carousel';

interface PropsType {
}

interface State {
}

class Twitter extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
    this.getAllyScienceTweets();
  }

  state = {
    tweetList: [],
    isConnected : true,
    viewWidth: 0
  }

  // componentDidMount() {
  //   NetInfo.addEventListener(state => {
  //     this.setState(state.isConnected);
  //   });
  // }

  getAllyScienceTweets() {
    let TWITTER_BEARER='AAAAAAAAAAAAAAAAAAAAAPha9wAAAAAAnAey0XZGomjlFBsfYsMJ1iYUbfk%3DF1hxES5gZSoxe839Pr22KSsnec3Y4ZTWTQJCvUweOJC9w8BbEJ'
    let bearer = 'Bearer ' + TWITTER_BEARER;
    return fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?count=50&screen_name=BAG_OFSP_UFSP&tweet_mode=extended',{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': bearer,
              'Content-Type': 'application/json'
            }})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson is :", responseJson )
        this.setState({tweetList : responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAllIndiceEntitiesWithLink(entities){

    var arrayOfDict:any = []; // create an empty array
    
    entities.urls.map(url => {
      arrayOfDict.push({
        url:   url.url,
        description: url.display_url,
        indices : url.indices
        });
    });

    entities.hashtags.map(hashTag => {
      arrayOfDict.push({
        url:  'https://twitter.com/hashtag/'+ hashTag.text,
        description: '#' + hashTag.text,
        indices : hashTag.indices
        });
    });

    entities.user_mentions.map(user => {
      arrayOfDict.push({
        url:  'https://twitter.com/'+ user.screen_name,
        description: '@' + user.screen_name,
        indices : user.indices
        });
    });

    if(entities.media != undefined){
      entities.media.map(media => {
        arrayOfDict.push({
          url:  '',
          description: '',
          indices : media.indices
          });
      });
    }
    
    return arrayOfDict.sort(this.compare);
  }

  compare( a: any, b: any ) {
    if ( a.indices[0] < b.indices[0] ){
      return -1;
    }
    if ( a.indices[0] > b.indices[0] ){
      return 1;
    }
    return 0;
  }

  renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "90%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
          }}
        />
      );
  };

  goToURL(myUrl: string) {
    Linking.canOpenURL(myUrl).then(supported => {
      if (supported) {
        Linking.openURL(myUrl);
      } else {
        console.log('Don\'t know how to open URI: ' + myUrl);
      }
    });
  }

  _renderItem = ({item, index}) => {
    let i = 0;
    let urlNextIndice = 0;
    let isRetweeted = false;
    let retweetedBy = '';
    let myItem : any = item;
  
    if (myItem.retweeted_status != undefined){
        isRetweeted = true;
        retweetedBy = myItem.user.name;
        myItem = myItem.retweeted_status;
    }
    
    
    let hasMedia = typeof myItem.entities.media != "undefined";
    let links = this.getAllIndiceEntitiesWithLink(myItem.entities);
    let hasLinks = links.length > 0;

    return(
      <View style={{backgroundColor:colors.white, height: 220}}>
        <View style={{ paddingTop: 30}}>
        {isRetweeted ?
        (
          <View style={{ flexDirection: 'row', paddingTop: 15 ,paddingLeft: 14, position:'absolute'}}>
            <View style={{paddingRight: 8}}>
              <Svg  width={14} height={14} viewBox="0 0 24 24">
                <G>   
                  <Path fill={colors.darkGray} d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z">
                  </Path>
                </G>
              </Svg>
            </View>
            <Text style={styles.retweet}>{retweetedBy} Retweeted</Text>
          </View>
        )
        :
        (<View></View>)
        }
      
        <View style={{ flexDirection: 'row', paddingBottom: 10, paddingTop: 5, paddingLeft: 10}}>
        <Image
            style={{width: 30, height: 30, borderRadius: 30/ 2}}
            source={{uri: myItem.user.profile_image_url_https}}
        />
        <ScrollView style={{ paddingLeft: 5, height:180, paddingRight: 10}}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <Text style={styles.tweetScreenName}>{myItem.user.name}</Text>
            <View style={{flexDirection: 'row', paddingBottom: 5}}>
                <Text style={styles.tweetUserName}>@{myItem.user.screen_name}</Text>
                <Text style={styles.tweetUserName}>.</Text>
                <Text style={styles.tweetDate}>{Moment(myItem.created_at).format('DD.MM.YYYY')}</Text>
            </View>
            <View>
              <Text>
                  {hasLinks ? 
                  (links.map(link => {
                      var result;
                      const rowLen = links.length;
                      if (rowLen === i + 1) {
                          //last one
                          urlNextIndice = myItem.full_text.length;
                      } else {
                          // not last one
                          let nextIndex = i + 1;
                          let nextUrl = links[nextIndex];
                          urlNextIndice = nextUrl.indices[0];
                      }
                          
                      if (i == 0 || rowLen == 1){
                          //first one
                          result = (
                            <Text>
                              <Text style={styles.tweetText}>{myItem.full_text.slice(0,link.indices[0])}</Text>
                              <Text style={styles.tweetLink} onPress={() => this.goToURL(link.url)}>{link.description}</Text>
                              <Text style={styles.tweetText}>{myItem.full_text.slice(link.indices[1], urlNextIndice)}</Text>
                            </Text>
                          );
                      }
                      else{
                          result = (
                          <Text>
                              <Text style={styles.tweetLink} onPress={() => this.goToURL(link.url)}>{link.description}</Text>
                              <Text style={styles.tweetText}>{myItem.full_text.slice(link.indices[1], urlNextIndice)}</Text>
                          </Text>);
                      } 
                      i++;
                      return result;
                  })) : 
                  (<Text style={styles.tweetText}>{myItem.full_text}</Text>)}
                </Text>
            </View> 
            <View style={{paddingTop: 5}}
            onLayout={event => {
                this.setState({
                  viewWidth: event.nativeEvent.layout.width
                })
            }}>
                {hasMedia ? (
                    myItem.entities.media.map(media => {
                        let height = (this.state.viewWidth * media.sizes.small.h)/media.sizes.small.w;
                        return (
                            <Image 
                             style={{width: this.state.viewWidth, height: height}}
                             resizeMode="contain"
                            source={{uri: media.media_url_https}} />);
                    })
                ):(
                    <View/>
                )}
            </View>
        </ScrollView>
        </View> 
      </View>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end', position:'absolute'}}>
        <Image
          style={{height: 15, width: 15, marginTop: 5, marginRight: 5}}
          source={require('../../resources/images/twitter/twitter-logo.png')}
        />
       </View>
    </View>
    );
  }

    render() {
      if (!this.state.isConnected) {
        return  <View>
                  <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 50, paddingVertical: 40.}}>
                    <Image
                      style={{flex: 1, resizeMode: 'contain', alignSelf: 'flex-start', height: '100%'}}
                      source={require('../../resources/images/twitter/twitter-logo.png')}
                    />
                    <View style={{flex: 3, flexDirection: 'row', width: '60%', alignItems: 'center'}}>
                      <Text>{localeString('dashboard.twitterCard.title')}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.tweetText}> {localeString('dashboard.twitterCard.no_connection_message')} </Text>  
                  </View>
              </View>
      }else{
        return  <View style={{paddingVertical: 15}}>
                  <View>
                    <Carousel
                      data={this.state.tweetList}
                      renderItem={this._renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                      sliderHeight={300}
                    />
                  </View>
                </View>;
      }
        
    }
}

const styles = StyleSheet.create({
    tweetUserName: {
        fontSize: 12,
        color: colors.darkGray,
        paddingRight: 5
    },
    tweetScreenName: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingRight: 5
        
    },
    tweetDate: {
        fontSize: 12,
        fontStyle: "italic",
        color: colors.darkGray
    },
    tweetText: {
        fontSize: 14
    },
    retweet: {
      color: colors.darkGray,
      fontSize: 11
    },
    retweetIcon: {
      color: colors.darkGray
    },
    tweetLink: {
        fontSize: 14,
        color: 'blue'
    }
});

export default Twitter;

