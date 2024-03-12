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
    color: var(--titleColor);
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
  z-index: 2;
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
    'What data source are you using?',
    'Currently using [caniuse.com](https://caniuse.com) ([caniuse github](https://github.com/Fyrd/caniuse/tree/main)), an open-source project to collect and present data on web browser compatibility. Hoping to expand to MDN - they have a lot more data there and missing features!',
  ],
  [
    'How do you determine if something is not supported?',
    'If Android Chrome supports a feature more than iOS WebKit, that feature is consider missing with special note if "Partially supported". There is filtering where you can remove less-standard or non-standard features from your search.',
  ],
  [
    'Who are you?',
    "Hi! 👋 I'm Shalanah Dawson a web dev. Connect on [LinkedIn](https://linkedin.com/in/shalanah), [GitHub](https://github.com/shalanah), or [Twitter](https://twitter.com/shalanahfaith).",
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
