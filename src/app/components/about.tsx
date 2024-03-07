import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './about.module.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const FAQ = [
  [
    'Is this site affiliated with Apple, iOS, or caniuse.com?',
    'No. Absolutely not. Nada. Zilch. Zero. Nein. Null. Non.',
  ],
  [
    'What is your source data?',
    'iOS404 uses [caniuse.com](https://caniuse.com) ([caniuse github](https://github.com/Fyrd/caniuse/tree/main)) for data, an open-source project to collect and present data on web browser compatibility.',
  ],
  [
    'How do you determine if something is not supported?',
    'If Android Chrome supports a feature more than iOS WebKit, that feature is consider missing with special note if "Partially supported".',
  ],
  [
    'Why is this iOS specific? Why not Android?',
    "iOS WebKit engine is a monopoly on iPhones and iPads. This monopoly has held back the web in terms of interactive APIs and PWAs. I am considering Android404 but **at the moment** since they are the gold-standard of web feature support - it doesn't seem worth it. NOTE: EU residents might have other engine options in the future due to DMA.",
  ],
  [
    'Why did you make this site?',
    "I have spent a lot of time debugging websites + PWAs on Apple devices. I have lost a lot of my life to it - and I'll never ever get that time back. I needed a place where I could see all the missing features at once and others could as well. I also wanted to play with R3F + Blender.",
  ],
  [
    'Who are you?',
    "Hi! 👋 So nice to meet you! I'm Shalanah Dawson a frontend developer. I started making websites in 2000 to showcase art and photography projects. I love coding, design, animation/interaction, and math. You can find me on [LinkedIn](https://linkedin.com/in/shalanah), [GitHub](https://github.com/shalanah), and [Twitter](https://twitter.com/shalanahfaith).",
  ],
  ['', 'Copyright 2024. All Rights Reserved - Shalanah Dawson'],
];

export const About = ({ button }: { button: React.ReactNode }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{button}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>
        <dl className={styles.dl}>
          {FAQ.map(([question, answer], i) => (
            <React.Fragment key={i}>
              <dt>
                <Markdown remarkPlugins={[remarkGfm]}>{question}</Markdown>
              </dt>
              <dd>
                <Markdown remarkPlugins={[remarkGfm]}>{answer}</Markdown>
              </dd>
            </React.Fragment>
          ))}
        </dl>
        {/* TODO: FAQ */}
        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
