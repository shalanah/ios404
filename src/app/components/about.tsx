import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './about.module.css';

const FAQ = [
  [
    'Is this site affiliated with Apple, iOS, or caniuse.com?',
    'No. Absolutely not. Nada. Zilch. Zero. Nein. iOS404 is a pet project and not affiliated with any of those entities.',
  ],
  [
    'What is your source data?',
    'This site uses data from caniuse.com, which is an open-source project to collect and present data on web browser compatibility.',
  ],
  [
    'How do you determine if something is not supported?',
    'Android Chrome features are compared to iOS WebKit features. If Android Chrome supports a feature more than iOS WebKit, we consider that iOS feature lacking or missing.',
  ],
  [
    'Why is this iOS specific? Why not Android?',
    'iOS WebKit is a monopoly engine on iPhones and iPads*. This means Chrome, Opera, Safari, Firefox or any other browser on an iPhone or iPad is still just WebKit. On the other hand, Android allows browser and engine competition. *EU residents may have other options in future due to DMCA.',
  ],
  [
    'Why did you make this site?',
    "I have spent way too much time learning about what iOS does not support by testing websites + PWAs (Progressive Web Apps) on iPhones and iPads. I have lost a lot of my life to it - and I'll never ever get that time back. I wanted a place where I could see all the missing features in one place and others could as well.",
  ],
  [
    'Who are you?',
    "Hi! 👋 So nice to meet you, and kind of you to ask! I'm Shalanah Dawson a frontend developer. I started making websites in 2000 to showcase my high school art and photography projects. I love coding, design, animation/interaction, and math. You can find me on LinkedIn, GitHub, and Twitter.",
  ],
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
              <dt>{question}</dt>
              <dd>{answer}</dd>
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
