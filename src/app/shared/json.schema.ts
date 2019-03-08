import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

const createSchema = (uri) => ({
  validate: true,
  noSyntaxValidation: false,
  schemas: [{
    uri: 'http://myserver/foo-schema.json',
    fileMatch: [uri.toString()],
    schema: {
      'definitions': {},
      '$schema': 'http://json-schema.org/draft-07/schema#',
      '$id': 'http://example.com/root.json',
      'type': 'object',
      'title': 'device configuration',
      'required': [
        'hostname'
      ],
      'properties': {
        'hostname': {
          '$id': '#/properties/hostname',
          'type': 'string',
          'title': 'Hostname',
          'examples': [
            '192.168.178.11',
            'my.domain.com'
          ],
          'pattern': '^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}|[a-zA-z_][a-zA-z1-9\\.\\-_]*)$'
        },
        'protocol': {
          '$id': '#/properties/hostname',
          'type': 'string',
          'title': 'Protocol',
          'enum': [
            'vnc',
            'rdp',
            'telnet',
            'ssh'
          ]
        },
        'port': {
          '$id': '#/properties/port',
          'type': 'number',
          'title': ' Port',
          'default': 3389,
          'examples': [
            3389
          ],


          'exclusiveMinimum': 0,
          'exclusiveMaximum': 99999
        },
        'domain': {
          '$id': '#/properties/domain',
          'type': 'string',
          'title': 'Domain',
          'default': null,
          'examples': [
            'AD_SV'
          ],


          'pattern': '^([a-zA-z_][a-zA-z1-9\\.\\-_]*)$'
        },
        'username': {
          '$id': '#/properties/username',
          'type': 'string',
          'title': 'Username',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'password': {
          '$id': '#/properties/password',
          'type': 'string',
          'title': 'Password',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'width': {
          '$id': '#/properties/width',
          'type': 'integer',
          'title': 'Width',
          'default': null,
          'examples': [
            123
          ]
        },
        'height': {
          '$id': '#/properties/height',
          'type': 'integer',
          'title': 'Height',
          'default': null,
          'examples': [
            123
          ]
        },
        'dpi': {
          '$id': '#/properties/dpi',
          'type': 'integer',
          'title': 'Dpi',
          'default': null,
          'examples': [
            123
          ]
        },
        'initial-program': {
          '$id': '#/properties/initial-program',
          'type': 'string',
          'title': 'Initial-program',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'color-depth': {
          '$id': '#/properties/color-depth',
          'type': 'string',
          'title': 'Color-depth',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'disable-audio': {
          '$id': '#/properties/disable-audio',
          'type': 'boolean',
          'title': 'Disable-audio',
          'default': null,
          'examples': [
            ''
          ]
        },
        'enable-printing': {
          '$id': '#/properties/enable-printing',
          'type': 'boolean',
          'title': 'Enable-printing',
          'default': false,
          'examples': [
            true
          ]
        },
        'printer-name': {
          '$id': '#/properties/printer-name',
          'type': 'string',
          'title': 'Printer-name',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'enable-drive': {
          '$id': '#/properties/enable-drive',
          'type': 'boolean',
          'title': 'Enable-drive',
          'default': false,
          'examples': [
            true
          ]
        },
        'drive-name': {
          '$id': '#/properties/drive-name',
          'type': 'string',
          'title': 'Drive-name',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'drive-path': {
          '$id': '#/properties/drive-path',
          'type': 'string',
          'title': 'Drive-path',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'create-drive-path': {
          '$id': '#/properties/create-drive-path',
          'type': 'string',
          'title': 'Create-drive-path',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'console': {
          '$id': '#/properties/console',
          'type': 'string',
          'title': 'Console',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'console-audio': {
          '$id': '#/properties/console-audio',
          'type': 'string',
          'title': 'Console-audio',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'server-layout': {
          '$id': '#/properties/server-layout',
          'type': 'string',
          'title': 'Server-layout',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'security': {
          '$id': '#/properties/security',
          'type': 'string',
          'title': 'Security',
          'default': 'rdp',
          'enum': ['rdp', 'nla', 'tls', 'any']
        },
        'ignore-cert': {
          '$id': '#/properties/ignore-cert',
          'type': 'boolean',
          'title': 'Ignore-cert',
          'default': false,
          'examples': [
            true
          ]
        },
        'disable-auth': {
          '$id': '#/properties/disable-auth',
          'type': 'boolean',
          'title': 'Disable-auth',
          'default': false,
          'examples': [
            true
          ]
        },
        'remote-app': {
          '$id': '#/properties/remote-app',
          'type': 'boolean',
          'title': 'Remote-app',
          'default': false,
          'examples': [
            true
          ]
        },
        'remote-app-dir': {
          '$id': '#/properties/remote-app-dir',
          'type': 'string',
          'title': 'Remote-app-dir',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'remote-app-args': {
          '$id': '#/properties/remote-app-args',
          'type': 'string',
          'title': 'Remote-app-args',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'static-channels': {
          '$id': '#/properties/static-channels',
          'type': 'string',
          'title': 'Static-channels',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'client-name': {
          '$id': '#/properties/client-name',
          'type': 'string',
          'title': 'Client-name',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'enable-wallpaper': {
          '$id': '#/properties/enable-wallpaper',
          'type': 'boolean',
          'title': 'Enable-wallpaper',
          'default': null,
          'examples': [
            ''
          ]
        },
        'enable-theming': {
          '$id': '#/properties/enable-theming',
          'type': 'boolean',
          'title': 'Enable-theming',
          'default': false,
          'examples': [
            true
          ]
        },
        'enable-font-smoothing': {
          '$id': '#/properties/enable-font-smoothing',
          'type': 'boolean',
          'title': 'Enable-font-smoothing',
          'default': false,
          'examples': [
            true
          ]
        },
        'enable-full-window-drag': {
          '$id': '#/properties/enable-full-window-drag',
          'type': 'boolean',
          'title': 'Enable-full-window-drag',
          'default': false,
          'examples': [
            true
          ]
        },
        'enable-desktop-composition': {
          '$id': '#/properties/enable-desktop-composition',
          'type': 'boolean',
          'title': 'Enable-desktop-composition',
          'default': false,
          'examples': [
            true
          ]
        },
        'enable-menu-animations': {
          '$id': '#/properties/enable-menu-animations',
          'type': 'boolean',
          'title': 'Enable-menu-animations',
          'default': false,
          'examples': [
            true
          ]
        },
        'disable-bitmap-caching': {
          '$id': '#/properties/disable-bitmap-caching',
          'type': 'boolean',
          'title': 'Disable-bitmap-caching',
          'default': false,
          'examples': [
            true
          ]
        },
        'disable-offscreen-caching': {
          '$id': '#/properties/disable-offscreen-caching',
          'type': 'boolean',
          'title': 'Disable-offscreen-caching',
          'default': false,
          'examples': [
            true
          ]
        },
        'disable-glyph-caching': {
          '$id': '#/properties/disable-glyph-caching',
          'type': 'boolean',
          'title': 'Disable-glyph-caching',
          'default': false,
          'examples': [
            true
          ]
        },
        'preconnection-id': {
          '$id': '#/properties/preconnection-id',
          'type': 'string',
          'title': 'Preconnection-id',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'preconnection-blob': {
          '$id': '#/properties/preconnection-blob',
          'type': 'string',
          'title': 'Preconnection-blob',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'enable-sftp': {
          '$id': '#/properties/enable-sftp',
          'type': 'boolean',
          'title': 'Enable-sftp',
          'default': false,
          'examples': [
            true
          ]
        },
        'sftp-hostname': {
          '$id': '#/properties/sftp-hostname',
          'type': 'string',
          'title': 'Sftp-hostname',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-host-key': {
          '$id': '#/properties/sftp-host-key',
          'type': 'string',
          'title': 'Sftp-host-key',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-port': {
          '$id': '#/properties/sftp-port',
          'type': 'string',
          'title': 'Sftp-port',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-username': {
          '$id': '#/properties/sftp-username',
          'type': 'string',
          'title': 'Sftp-username',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-password': {
          '$id': '#/properties/sftp-password',
          'type': 'string',
          'title': 'Sftp-password',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-private-key': {
          '$id': '#/properties/sftp-private-key',
          'type': 'string',
          'title': 'Sftp-private-key',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-passphrase': {
          '$id': '#/properties/sftp-passphrase',
          'type': 'string',
          'title': 'Sftp-passphrase',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-directory': {
          '$id': '#/properties/sftp-directory',
          'type': 'string',
          'title': 'Sftp-directory',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-root-directory': {
          '$id': '#/properties/sftp-root-directory',
          'type': 'string',
          'title': 'Sftp-root-directory',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'sftp-server-alive-interval': {
          '$id': '#/properties/sftp-server-alive-interval',
          'type': 'string',
          'title': 'Sftp-server-alive-interval',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'recording-path': {
          '$id': '#/properties/recording-path',
          'type': 'string',
          'title': 'Recording-path',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'recording-name': {
          '$id': '#/properties/recording-name',
          'type': 'string',
          'title': 'Recording-name',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'recording-exclude-output': {
          '$id': '#/properties/recording-exclude-output',
          'type': 'string',
          'title': 'Recording-exclude-output',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'recording-exclude-mouse': {
          '$id': '#/properties/recording-exclude-mouse',
          'type': 'string',
          'title': 'Recording-exclude-mouse',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'recording-include-keys': {
          '$id': '#/properties/recording-include-keys',
          'type': 'string',
          'title': 'Recording-include-keys',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'create-recording-path': {
          '$id': '#/properties/create-recording-path',
          'type': 'string',
          'title': 'Create-recording-path',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'resize-method': {
          '$id': '#/properties/resize-method',
          'type': 'string',
          'title': 'Resize-method',
          'default': null,
          'enum': ['display-update', 'reconnect'],
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'enable-audio-input': {
          '$id': '#/properties/enable-audio-input',
          'type': 'string',
          'title': 'Enable-audio-input',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'read-only': {
          '$id': '#/properties/read-only',
          'type': 'boolean',
          'title': 'Read-only',
          'default': false,
          'examples': [
            true
          ]
        },
        'gateway-hostname': {
          '$id': '#/properties/gateway-hostname',
          'type': 'string',
          'title': 'Gateway-hostname',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'gateway-port': {
          '$id': '#/properties/gateway-port',
          'type': 'string',
          'title': 'Gateway-port',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'gateway-domain': {
          '$id': '#/properties/gateway-domain',
          'type': 'string',
          'title': 'Gateway-domain',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'gateway-username': {
          '$id': '#/properties/gateway-username',
          'type': 'string',
          'title': 'Gateway-username',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'gateway-password': {
          '$id': '#/properties/gateway-password',
          'type': 'string',
          'title': 'Gateway-password',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        },
        'load-balance-info': {
          '$id': '#/properties/load-balance-info',
          'type': 'string',
          'title': 'Load-balance-info',
          'default': null,
          'examples': [
            ''
          ],
          'pattern': '^(.*)$'
        }
      }
    }
  }]
});

export const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
    const uri = monaco.Uri.parse('a://b/foo.json');
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(createSchema(uri));
  }
};
