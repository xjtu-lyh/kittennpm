export default class HeartView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      imageSize: new Animated.Value(0), //动画初始值为 0，目标值为 1 。会经过插值转换后应用到 Animated.Image上
    }
  }

  startImageAnimation = () => {

	//动画开始前先将初始值设为0，否则第一次执行后this.state.imageSize的动画值一直是 1, 不再有效果

    this.state.imageSize.setValue(0)	
    Animated.spring(
      this.state.imageSize,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }

  render() {

	//动画值从0-1，对其进行插值转换 ，映射成实际的图片大小
	//再将实际的图片大小设置给 Animated.Image 的样式

    const imageSize = this.state.imageSize.interpolate({   
      inputRange: [0, 0.5, 1],
      outputRange: [30, 40, 30]
    });
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={this.startImageAnimation}
        >
          <Animated.Image source={ICON_HEART} 
						  style={{width: imageSize, height: imageSize,  //应用到 Animated.Image 上
					          tintColor: '#dc3132'}}/>
        </TouchableOpacity>
      </View>
    );
  }
}
