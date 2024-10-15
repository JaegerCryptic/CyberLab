import React from "react"
import {
  Fade,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material"
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"

import { Rule } from "../constants"
import { appTheme } from "../../../../theme/style"

interface RuleListProps {
  rules: Rule[]
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
  const sortedRules = [...rules].sort((a, b) => {
    // Sort rule 33 at the top if it's revealed and not met
    if (a.id === 33 && !a.met) return -1
    if (b.id === 33 && !b.met) return 1
    return Number(a.met) - Number(b.met)
  })

  const PADDING = "16px"

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "calc(100% - 20px)",
        ml: "-24px",
        paddingLeft: 0,
      }}
    >
      {sortedRules.map((rule) => {
        if (!rule.revealed) return null

        const bgColor = rule.met
          ? appTheme.colors.success.dark
          : appTheme.colors.error.dark

        const isBombRule = rule.id === 33 && !rule.met

        return (
          <Fade in={true} timeout={1200} key={rule.id}>
            <Box sx={{ width: "100%" }}>
              <ListItem sx={{ mb: PADDING, padding: 0 }}>
                <Box
                  sx={{
                    backgroundColor: bgColor,
                    padding: isBombRule ? "32px" : PADDING, // Enlarge padding for the bomb rule
                    borderRadius: "4px",
                    width: "100%",
                    boxShadow:
                      "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
                    transition: "background-color 0.3s, padding 0.3s", // Smooth transition for the bomb rule
                  }}
                >
                  {/* Title: X Rule 1 or ✓ Rule 1 */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemIcon>
                      {rule.met ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </ListItemIcon>
                    <Typography
                      variant="h6"
                      sx={{ color: appTheme.colors.text, fontWeight: isBombRule ? "bold" : "normal" }} // Bold for bomb rule
                    >
                      {`Rule ${rule.id}`}
                    </Typography>
                  </Box>

                  {/* Instructions or the body of the rule */}
                  <Typography
                    variant={isBombRule ? "h5" : "body1"} // Enlarge text for the bomb rule
                    sx={{
                      color: appTheme.colors.text,
                      mt: "8px",
                    }}
                  >
                    {rule.text}
                  </Typography>
                </Box>
              </ListItem>
            </Box>
          </Fade>
        )
      })}
    </List>
  )
}

export default RuleList
