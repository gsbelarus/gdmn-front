/**
 * This script generates mock data for local development
 */

const fetch = require('node-fetch');
const fs = require('fs');

const API_ER_URL = 'http://192.168.0.78:4000/er';
const API_DATA_URL = 'http://192.168.0.78:4000/data';
const _ER_DATA_MOCK_QUERY = {
  link: {
    entity: 'GD_USER',
    alias: 'U',
    fields: [
      {
        attribute: 'CONTACTKEY',
        link: {
          entity: 'Person',
          alias: 'P',
          fields: [
            {
              attribute: 'NAME'
            }
          ]
        }
      }
    ]
  },
  options: {
    order: {
      P: {
        NAME: 'asc'
      }
    }
  }
};
const ER_DATA_MOCK_QUERY = {
  link: {
    entity: 'GD_USER',
    alias: 'U',
    fields: [
      {
        attribute: 'NAME'
      }
    ]
  }
};
const COMMAND_DATA_MOCK_QUERY = {
  link: {
    entity: 'Company',
    alias: 'alias',
    fields: [
      {
        attribute: 'ID'
      },
      {
        attribute: 'NAME'
      },
      {
        attribute: 'ADDRESS'
      },
      {
        attribute: 'DISTRICT'
      },
      {
        attribute: 'CITY'
      },
      {
        attribute: 'REGION'
      },
      {
        attribute: 'ZIP'
      },
      {
        attribute: 'COUNTRY'
      },
      {
        attribute: 'NOTE'
      },
      {
        attribute: 'EXTERNALKEY'
      },
      {
        attribute: 'EMAIL'
      },
      {
        attribute: 'URL'
      },
      {
        attribute: 'POBOX'
      },
      {
        attribute: 'PHONE'
      },
      {
        attribute: 'FAX'
      },
      {
        attribute: 'EDITIONDATE'
      },
      {
        attribute: 'AFULL'
      },
      {
        attribute: 'ACHAG'
      },
      {
        attribute: 'AVIEW'
      },
      {
        attribute: 'DISABLED'
      },
      {
        attribute: 'RESERVED'
      },
      {
        attribute: 'USR$WG_LISTNUM'
      },
      {
        attribute: 'USR$DEP_OLDCODE'
      },
      {
        attribute: 'USR$WAGE_OLDEMPLKEY'
      },
      {
        attribute: 'USR$WB_PERCFORCLASS'
      },
      {
        attribute: 'USR$DISTANCE'
      },
      {
        attribute: 'USR$COD'
      },
      {
        attribute: 'USR$WAGE_OLDDEPTKEY'
      },
      {
        attribute: 'USR$MN_USEPORTION'
      },
      {
        attribute: 'USR$WB_TABELNUM'
      },
      {
        attribute: 'USR$MN_REMAINSPRICE'
      },
      {
        attribute: 'USR$MN_SMID'
      },
      {
        attribute: 'USR$SORT'
      },
      {
        attribute: 'USR$BRANCH_CODE'
      },
      {
        attribute: 'USR$MN_USETAX'
      },
      {
        attribute: 'USR$WAGE_CODE'
      },
      {
        attribute: 'USR$VMK_FT_GROUP'
      },
      {
        attribute: 'USR$VBPF_ISOBOSOB'
      },
      {
        attribute: 'CREATIONDATE'
      },
      {
        attribute: 'USR$VMK_FT_PERCGROUP'
      },
      {
        attribute: 'USR$VMK_ISGLASS'
      },
      {
        attribute: 'USR$FA_OKONH'
      },
      {
        attribute: 'USR$VMK_NAME_FT_CON'
      },
      {
        attribute: 'USR$VMK_FT_GOODNAME'
      },
      {
        attribute: 'USR$VMK_INCLUDECASS'
      },
      {
        attribute: 'USR$VBPF_MATCODE'
      },
      {
        attribute: 'USR$VBPF_MATRESPONSIBLE'
      },
      {
        attribute: 'USR$VBPF_ISMATRESP'
      },
      {
        attribute: 'USR$VBPF_KINDUCHET'
      },
      {
        attribute: 'USR$SHCODE'
      },
      {
        attribute: 'USR$VBPF_UNP'
      },
      {
        attribute: 'USR$VBPF_TIME_WAIT'
      },
      {
        attribute: 'USR$VBPF_UPLIMTIME0'
      },
      {
        attribute: 'USR$VBPF_DNLIMTIME0'
      },
      {
        attribute: 'USR$VBPF_COSTASDEPOT'
      },
      {
        attribute: 'USR$VISIBLE'
      },
      {
        attribute: 'USR$VBPF_ISDENOM'
      },
      {
        attribute: 'USR$VBPF_AVECOST'
      },
      {
        attribute: 'LAT'
      },
      {
        attribute: 'LON'
      },
      {
        attribute: 'USR$VBPF_ISGSM'
      },
      {
        attribute: 'USR$CODE_NOT_REZIDENT'
      },
      {
        attribute: 'FULLNAME'
      },
      {
        attribute: 'COMPANYTYPE'
      },
      {
        attribute: 'LOGO'
      },
      {
        attribute: 'USR$INV_NDSDODGER'
      },
      {
        attribute: 'USR$PLUSCOMPANYTYPE'
      },
      {
        attribute: 'USR$EVAT_OFFSHORE'
      },
      {
        attribute: 'USR$EVAT_EAEU'
      },
      {
        attribute: 'USR$EVAT_NATIVE'
      },
      {
        attribute: 'USR$EVAT_ISBIGCOMPANY'
      },
      {
        attribute: 'LEGALNUMBER'
      },
      {
        attribute: 'TAXID'
      },
      {
        attribute: 'OKPO'
      },
      {
        attribute: 'OKNH'
      },
      {
        attribute: 'SOATO'
      },
      {
        attribute: 'SOOU'
      },
      {
        attribute: 'LICENCE'
      },
      {
        attribute: 'OKULP'
      }
    ]
  }
};

const jsonDb = {};

async function getEr() {
  const response = await fetch(API_ER_URL);
  return await response.json();
}

async function getData(query) {
  const response = await fetch(API_DATA_URL, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

(async function() {
  try {
    jsonDb.er = await getEr();
    jsonDb.data = {};
    jsonDb.data.er = await getData(ER_DATA_MOCK_QUERY);
    jsonDb.data.command = await getData(COMMAND_DATA_MOCK_QUERY);

    fs.writeFile('./mock-db.json', JSON.stringify(jsonDb), function(err) {
      if (err) return console.log(err);
      console.log('Mock data generated.');
    });
  } catch (error) {
    console.log(error);
  }
})();
