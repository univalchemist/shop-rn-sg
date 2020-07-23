import React, { useEffect, useState } from 'react';
import {
  Box,
  PlainText,
  ScrollView,
  SectionHeadingText,
} from '@cxa-rn/components';
import { connect } from 'react-redux';
import { useTheme, useIntl } from '@heal/src/wrappers/core/hooks';
import { getInvoices } from '@heal/src/store/actions';
import { TouchableOpacity } from 'react-native';
import { HEAL_APPOINTMENT_DETAIL } from '@heal/routes';
import moment from 'moment';
import { useGetFormattedPrice } from '@heal/src/screens/Invoices/utils/getFormatedPrice';
import { Image } from '@heal/src/wrappers/components';
import { chevronRightArrow } from '@images';
import { HEAL_INVOICE_DETAILS } from '@heal/routes';
const InvoicesScreen = props => {
  const theme = useTheme();
  const intl = useIntl();

  const [isPending, setIsPending] = useState(false);
  const { getInvoices, invoices, navigation } = props;
  const invoicesArr = invoices;
  const PaymentTypes = [
    {
      id: '1',
      type: 'PENDING',
      title: intl.formatMessage({ id: 'heal.invoices.pendingPayment' }),
      isArrow: true,
    },
    {
      id: '2',
      type: 'DONE',
      title: intl.formatMessage({ id: 'heal.invoices.paid' }),
    },
  ];

  const payments = PaymentTypes.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }
    acc[item.title].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const getInvoicesfun = async () => {
      try {
        await getInvoices();
      } catch (e) {
        console.log('error occurred', e);
      }
    };
    getInvoicesfun();
  }, [getInvoices]);

  const InvoiceCard = ({ index, isPending, invoice }) => {
    const formatedPrice = useGetFormattedPrice(invoice?.total_amount);
    return (
      <Box
        key={index}
        pt={18}
        pb={30}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Box>
          <SectionHeadingText
            color={isPending ? theme.colors.gray[0] : theme.colors.gray[8]}
          >
            {formatedPrice}
          </SectionHeadingText>
          <PlainText color={isPending && theme.colors.gray[0]}>
            {invoice?.items[0]?.name}
          </PlainText>
          <PlainText>
            {moment(invoice?.service_date).format('DD MMM YYYY')}
          </PlainText>
        </Box>
        <Box justifyContent={'center'}>
          {isPending && <Image marginLeft="auto" source={chevronRightArrow} />}
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      {invoicesArr && invoicesArr.length === 0 ? (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <PlainText>
            {intl.formatMessage({ id: 'heal.invoices.noInvoices' })}
          </PlainText>
        </Box>
      ) : (
        <Box flex={1} mt={24}>
          <ScrollView flex={1}>
            {[payments].map((data, ind) => {
              return (
                <Box mt={16} key={ind} px={4}>
                  {Object.keys(data).map(innerData =>
                    data[innerData].map((infoData, ind) => (
                      <Box pb={ind === 0 && isPending && 30}>
                        <SectionHeadingText
                          key={ind}
                          fontSize={16}
                          lineHeight={22}
                          letterSpacing={0.3}
                          pb={infoData.type === 'PENDING' && !isPending && 122}
                        >
                          {infoData.title}
                        </SectionHeadingText>
                        {invoicesArr.map((item, ind) => {
                          if (
                            item.invoice.state === infoData.type &&
                            infoData.isArrow
                          ) {
                            if (!isPending) {
                              setIsPending(true);
                            }
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(HEAL_INVOICE_DETAILS, {
                                    invoice: item.invoice,
                                  })
                                }
                                key={ind}
                              >
                                <InvoiceCard
                                  isPending={true}
                                  index={ind}
                                  invoice={item?.invoice}
                                />
                              </TouchableOpacity>
                            );
                          } else if (item.invoice.state === infoData.type) {
                            return (
                              <InvoiceCard
                                index={ind}
                                invoice={item?.invoice}
                              />
                            );
                          }
                        })}
                      </Box>
                    )),
                  )}
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = ({ heal: { invoices } }) => {
  return { invoices };
};

export default connect(mapStateToProps, { getInvoices })(InvoicesScreen);
