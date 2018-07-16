import React, { Component, Fragment, SFC } from 'react';
import Drawer from '@material-ui/core/Drawer/Drawer';
import List from '@material-ui/core/List/List';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import CSSModules from 'react-css-modules';
import Typography from '@material-ui/core/Typography/Typography';
import { translate, Trans, InjectedTranslateProps, InjectedI18nProps } from 'react-i18next';
// import { i18n } from 'i18next';

const styles = require('./styles.css');

@CSSModules(styles)
class Web extends Component<CSSModules.InjectedCSSModuleProps, {}> {
  // @translate(['i18nDemo']) // FIXME
  private static renderI18nDemoView({ t, i18n }: InjectedTranslateProps & InjectedI18nProps) {
    return (
      <div>
        {t('i18nDemo::title')}
        <br />
        <br />
        <button onClick={() => i18n.changeLanguage('ru')}>ru</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
        <br />
        <br />
        <Trans>common::loremIpsum</Trans>
      </div>
    );
  }
  private static transI18nDemoView = translate(['i18nDemo'])(Web.renderI18nDemoView);

  public render(): JSX.Element {
    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: 'drawer-paper'
          }}
        >
          <List subheader={<ListSubheader component="div">Module demo</ListSubheader>}>
            <ListItem button={true} component="a" href="#auth">
              <ListItemText primary="Authorization" />
            </ListItem>
            <ListItem button={true} component="a" href="#i18n">
              <ListItemText primary="i18n" />
            </ListItem>
            <ListItem button={true} component="a" href="#l10n">
              <ListItemText primary="l10n" />
            </ListItem>
          </List>
        </Drawer>
        <div styleName="content">
          <div id="auth" style={{ paddingTop: 16 }}>
            <Typography variant="display1" gutterBottom={true}>
              Authorization
              <a href="#auth" styleName="link-decor">
                #
              </a>
            </Typography>
          </div>
          <div id="i18n" style={{ paddingTop: 16 }}>
            <Typography variant="display1" gutterBottom={true}>
              i18n
              <a href="#i18n" styleName="link-decor">
                #
              </a>
            </Typography>

            <Web.transI18nDemoView />
          </div>
          <div id="l10n" style={{ paddingTop: 16 }}>
            <Typography variant="display1" gutterBottom={true}>
              l10n
              <a href="#l10n" styleName="link-decor">
                #
              </a>
            </Typography>
          </div>
        </div>
      </Fragment>
    );
  }
}

export { Web };
