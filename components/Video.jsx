import $ from 'jquery';
import React from 'react';

export default class Video extends React.Component {
    static defaultProps = {
        poster: null,
        src: null,
        width: 640,
        height: 360,
        className: 'video-js vjs-default-skin vjs-big-play-centered',
        controls: true,
        autoplay: false,
        preload: 'auto',
    }

    componentDidMount() { this.checkIfVideoNeedsInstallation(); }
    componentDidUpdate() { this.checkIfVideoNeedsInstallation(); }

    checkIfVideoNeedsInstallation = () => {
        if(!this.props.src)
            return;
        
        if(typeof videojs === 'undefined') {
            $('<link/>', {rel: 'stylesheet', type: 'text/css', href: 'https://vjs.zencdn.net/4.12/video-js.css'}).appendTo('head');
            $.getScript('https://vjs.zencdn.net/4.12/video.js', this.loadVideo);
        } else {
            this.loadVideo();
        }
    }

    loadVideo = () => {
        if(this.video || !this.props.src)
            return;

        let node = React.findDOMNode(this.refs.videoplayer);
        if(!node)
            return;

        this.video = document.createElement('video');
        this.video.src = this.props.src;
        this.video.width = this.props.width;
        this.video.height = this.props.height;
        this.video.className = this.props.className;
        node.appendChild(this.video);
        videojs(this.video, this.props);
    }
    
    render() {
        return <div ref="videoplayer" />;
    }
}