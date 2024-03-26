import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';

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

const FAQ = [
  [
    'Is this site affiliated with Apple, iOS, or caniuse.com?',
    'No. Absolutely not. Nada. Zilch. Zero. Nein. Null. Non.',
  ],
  [
    'What data source are you using?',
    'iOS404 uses [caniuse.com](https://caniuse.com) ([caniuse github](https://github.com/Fyrd/caniuse/tree/main)) data. In the future, hoping to expand to MDN data as well --- there are even more missing iOS features in MDN data.',
  ],
  [
    'How do you determine if something is not supported?',
    'If the selected comparison browser(s) (Chrome for Android is the default but others may be selected) supports a feature more than iOS WebKit, then that feature is consider missing with special note if support is "Partial". You can also use the filtering icon to remove less-standard or non-standard specifications from your search.',
  ],
  [
    'Who are you?',
    "Hi! 👋 I'm Shalanah Dawson a developer that believes the web should be powerful, approachable, and fun. Find me on [Twitter](https://twitter.com/shalanahfaith), [GitHub](https://github.com/shalanah), or [LinkedIn](https://linkedin.com/in/shalanah).",
  ],
  [
    'Do you track me?',
    'iOS404 uses TelemetryDeck. TelemetryDeck does not collect any personally identifiable information. This helps to understand how our users are using the website and how we can improve it. iOS404 sends a best guess on country, device type (phone/tablet/desktop), and vendor (Apple/Google). You can read more about [TelemetryDeck’s privacy policy](https://telemetrydeck.com/privacy)',
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
