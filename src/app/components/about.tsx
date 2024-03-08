import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const Dl = styled.dl`
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  dt {
    color: var(--alternateTitle);
    line-height: 1.2;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  dd {
    line-height: 1.6;
    font-size: 0.9rem;
    margin-bottom: 25px;
  }
  dd:last-child {
    margin-bottom: 0px;
  }
`;

const DialogClose = styled(Dialog.Close)`
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: 0.2s;
  outline: 1px solid transparent;
  z-index: 2;
  &:hover,
  &:focus {
    outline: 1px solid currentColor;
  }
`;
const DialogContent = styled(Dialog.Content)`
  text-align: left;
  background-color: var(--modalBg);
  border-radius: 22px;
  box-shadow: var(--modalShadow) 0px 10px 38px -10px,
    var(--modalShadow) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: auto;
  :focus {
    outline: none;
  }
`;
const DialogOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

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
      <DialogOverlay />
      <DialogContent>
        <Dl>
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
        </Dl>
        <DialogClose>
          <Cross2Icon />
        </DialogClose>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);
