// @ts-nocheck

import { Html } from '@react-three/drei';

export const Text = ({ controls }) => {
  return (
    <Html
      transform
      wrapperClass="wrapper"
      distanceFactor={10}
      position={controls.htmlPosition}
      occlude={'raycast'}
      // side={THREE.FrontSide} // Required
    >
      <div
        style={{
          pointerEvents: 'none',
          width: 1000,
          height: 1150,
          scale: 4,
          position: 'relative',
        }}
      >
        <svg viewBox="0 0 4000 4600">
          <rect
            x="200"
            y="200"
            width="3600"
            height="4200"
            fill={'transparent'}
            strokeWidth={80}
            stroke={'#000'}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 70,
            fontSize: 38,
            lineHeight: '40px',
            width: '80%',
            left: '10%',
            fontWeight: 'bold',
            textAlign: 'left',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              fontSize: 150,
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Missing
          </div>

          <div
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 280,
                flexShrink: 0,
                background: '#000',
                height: 280,
              }}
            />

            <div>
              <div style={{ fontSize: 50, marginBottom: 15 }}>
                Vibration API
              </div>
              <div style={{ fontSize: 32, lineHeight: '40px' }}>
                Born:
                <br />
                2015 Chrome 125
                <br />
                Group:
                <br />
                WGA sdfkjlskdfj
                <br /> Last seen:
                <br />
                Chrome Android, Native iOS Apps
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'left',
              textTransform: 'none',
              fontSize: 32,
              lineHeight: '40px',
            }}
          >
            Vibration API knew how to make you feel loved. It was a simple API
            to provide gamers and users haptic feedback. Last seen on Android
            Chrome and in native apps. We never saw them again after they
            chatted with iOS Webkit. We are all very worried. Game controllers
            have reached out to express their distress and dismay at the
            disappearance of their close friend.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 90,
            fontSize: 32,
            lineHeight: '40px',
            width: '80%',
            left: '10%',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          If you have any information regarding this feature, please contact
          caniuse.com
        </div>
      </div>
    </Html>
  );
};
