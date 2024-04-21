import { getMissingDate } from './getFeatureStats';
import { MissingFeatureIndexType, SupportType } from './missingFeature';
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown';

const getCopySupport = (support: SupportType) => {
  switch (support) {
    case 'y':
      return '✅ Supported';
    case 'n':
      return '❌ None';
    case 'a':
      return '🟠 Partial';
    case 'unknown':
    default:
      return 'Unknown';
  }
};

const formatDescription = (str: string, source: string) => {
  switch (source) {
    case 'mdn':
      return NodeHtmlMarkdown.translate(str);
    case 'caniuse':
    default:
      return str.replaceAll(/\(\//g, '(https://caniuse.com/');
  }
};

export const getOnCopy =
  (feature: MissingFeatureIndexType, statuses: any) => async () => {
    const {
      iOSWebkitStat,
      title,
      description,
      notes,
      browsers,
      firstSeen,
      specUrl,
      specKey,
      source,
      sourceUrl,
    } = feature;
    let text = [`iOS404:`, window.location, '', 'Feature:', title];
    if (notes && notes.length > 0) {
      // convert to markdown
      text.push('');
      text.push('iOS Notes:');
      notes.forEach((note) => {
        if (note) text.push(formatDescription(note, source)); // notes are in markdown or as paragraphs... need to convert to markdown please
      });
    }
    text.push('');
    text.push('Description:');
    text.push(formatDescription(description, source)); // TODO: Fix markdown Caniuse links
    // text.push(NodeHtmlMarkdown.translate('<p>Hey</p>')); // TODO: for MDN notes

    text.push('');
    text.push('Support:');
    text.push(`iOS WebKit: ${getCopySupport(iOSWebkitStat)}`);
    text.push(`Mac Safari: ${getCopySupport(browsers.safari.support)}`);
    text.push(`Chrome Android: ${getCopySupport(browsers.and_chr.support)}`);
    text.push(`Firefox Android: ${getCopySupport(browsers.and_ff.support)}`);
    text.push('');
    let [firstSeenBrowser = '', dateSupported, firstSeenVersion = ''] =
      firstSeen;
    const { age, year } = getMissingDate(dateSupported);
    text.push(`Missing: ${age} (${year})`);
    text.push(`Parents: ${firstSeenBrowser} ${firstSeenVersion}`);
    text.push(`Spec: ${statuses[specKey]}`);
    text.push(`Spec url: ${specUrl}`);
    text.push(`Source url: ${sourceUrl}`);

    try {
      await navigator.clipboard.writeText(text.join('\r')); // Use the Clipboard API to copy text
      console.log('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    console.log('copied');
  };
