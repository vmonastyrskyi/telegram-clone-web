import React, {useState} from 'react';

import './RoundImage.css';

interface Props {
  image: string | undefined;
  title: string;
  width: number;
  height: number;
  fontSize: number;
}

export const RoundImage: React.FC<Props> = (props) => {
  const [hasImage] = useState(
    props.image !== undefined && props.image !== ''
  );
  const [hasTitle] = useState(
    props.title !== undefined && props.title !== ''
  );

  if (hasImage) {
    return <img className="round-image"
                src={props.image}
                style={{width: props.width, height: props.height}}
                alt=""/>
  }

  if (hasTitle) {
    let imageTitle: string;
    const words: string[] = props.title!.split(' ');
    if (words.length === 1) {
      imageTitle = words[0][0];
    } else if (words.length === 2) {
      imageTitle = words[0][0] + words[1][0];
    } else {
      imageTitle = words[0][0] + words[words.length - 1][words[words.length - 1].length - 1];
    }
    const randomColor: string = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)

    return (
      <div className="round-image no-image"
           style={{backgroundColor: randomColor, width: props.width, height: props.height, fontSize: props.fontSize, lineHeight: (props.fontSize + 'px')}}>
        <span>{imageTitle.toUpperCase()}</span>
      </div>
    );
  }

  return <></>;
}
