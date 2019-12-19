## :notes:这是一个可视化/模块化的声音生成链
所有模块都基于`Module`类，在这基础上又初步分了几个基础类:

`Keyboard`类型是音乐信号的发生器，用于给Instrument输出音符

`Instrument`类型是发声的乐器，比如一个钢琴采样或者一个基础波形的发生器

`Effect`类型是乐器的效果器，可以将连接到他的声音进行处理，比如一个混响效果器或者滤波器

`Master`类型则是最终的声音输出节点

====================================================
#### 现在我只写了5个简单的模块，点按并移动模块的最上方那一条`灰色栏`可以移动，`灰色栏`上方的信息是`模块名(模块类型)`。

名字为<font color=red>keyboard</font>的就是一个简单的用键盘控制的音符发生器，左上角是对应的键盘字母。

名字为<font color=red>moasynth</font>的就是一个正弦波发生器。

名字为<font color=red>sampler</font>的是一个采样音源，包含钢琴和吉他音源。

名字为<font color=red>moafilter</font>的是一个滤波器，点击界面移动小红球位置可以获得不同效果。

名字为<font color=red>master</font>的就是最终输出节点。