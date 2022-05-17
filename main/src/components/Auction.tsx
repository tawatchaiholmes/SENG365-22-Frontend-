import {useNavigate, useParams} from "react-router-dom";
import {BackBtn, BackBtnLink} from "./ButtonElement";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput,
    Paper, Snackbar,
    Stack, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import {NavTop, NavBottom, NavBtnLink} from "./Navbar/NavbarElement";
import React from "react";
import CSS from "csstype";
import axios from "axios";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Auctions from "./Auctions";


const Auction = () => {
    let {id} = useParams();
    const navigate = useNavigate()
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [openBidderDialog, setOpenBidderDialog] = React.useState(false)
    const [openSimilarAuctionDialog, setOpenSimilarAuctionDialog] = React.useState(false)
    const [category, setCategory] = React.useState<Array<Category>>([])
    const [highestBidderId, sethighestBidderId] = React.useState(0)
    const [highestFirstnameBidder, sethighestFirstnameBidder] = React.useState("")
    const [highestLastnameBidder, sethighestLastnameBidder] = React.useState("")
    const [similarauction, setSimilarAuction] = React.useState<Array<any>>([{
        auctionId: 0,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""
    }])
    const [auction, setAuction] = React.useState<Auctions>({
        auctionId: 0,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""
    })

    const [bids, setBids] = React.useState<Array<Bid>>([{
        firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0
    }])

    const [dialogBidder, setDialogBidder] = React.useState<Bid>({
        firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0
    })

    const [updateBidder, setUpdateBidder] = React.useState<Bid>({
        firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0
    })

    const handleBidderDialogOpen = (bids: Bid) => {
        setDialogBidder(bids)
        setOpenBidderDialog(true);
    };
    const handleBidderDialogClose = () => {
        setUpdateBidder({
            firstName: "firstName",
            lastName: "lastName",
            amount: 0,
            id: 0,
            timestamp: new Date(),
            auction_id: 0,
            user_id: 0,
            bidderId: 0
        })
        setOpenBidderDialog(false);
    };

    const [dialogSimilarAuction, setdialogSimilarAuction] = React.useState<Auctions>({
        auctionId: 0,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""
    })

    const [updateSimilarAuction, setupdateSimilarAuction] = React.useState<Auctions>({
        auctionId: 0,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""
    })

    const handleSimilarAuctionOpen = (similarauction: Auctions) => {
        setdialogSimilarAuction(similarauction)
        setOpenSimilarAuctionDialog(true)
    }

    const handleSimilarAuctionClose = () => {
        setupdateSimilarAuction({
            auctionId: 0,
            title: "",
            description: "",
            reserve: 0,
            categoryId: 0,
            sellerId: 0,
            sellerFirstName: "",
            sellerLastName: "",
            highestBid: 0,
            numBids: 0,
            endDate: new Date(),
            image_filename: ""
        })
        setOpenSimilarAuctionDialog(false);
    }

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

    const [dialogAuction, setDialogAuction] = React.useState<Auctions>({
        auctionId: -1,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""
    })
    const handleDeleteDialogOpen = (auction: Auctions) => {
        setDialogAuction(auction)
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDialogAuction({
            auctionId: -1,
            title: "",
            description: "",
            reserve: 0,
            categoryId: 0,
            sellerId: 0,
            sellerFirstName: "",
            sellerLastName: "",
            highestBid: 0,
            numBids: 0,
            endDate: new Date(),
            image_filename: ""
        })
        setOpenDeleteDialog(false);
    };


    const [bid, setBid] = React.useState(0)
    const [openBidDialog, setOpenBidDialog] = React.useState(false)
    const [BidFlag, setBidFlag] = React.useState(false)
    const [BidMessage, setBidMessage] = React.useState("")

    const [postbid, setPostBid] = React.useState<any>({
        firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0
    })
    const [dialogBid, setDialogBid] = React.useState<any>({
        firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0
    })

    const handleBidDialogOpen = (x: Bid) => {
        setDialogBid(x)
        setOpenBidDialog(true);
    };

    const handleBidDialogClose = () => {
        setPostBid({
            firstName: "firstName",
            lastName: "lastName",
            amount: 0,
            id: 0,
            timestamp: new Date(),
            auction_id: 0,
            user_id: 0,
            bidderId: 0
        })
        setOpenBidDialog(false);
    };

    const [snackOpen, setSnackOpen] = React.useState(false)
    const [snackMessage, setSnackMessage] = React.useState("")
    const handleSnackClose = (event?: React.SyntheticEvent | Event,
                              reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

    React.useEffect(() => {
        getOneAuction()
        getCategory()
        getAuctionBid()
    }, [highestBidderId, highestFirstnameBidder, highestLastnameBidder, id])

    const getOneAuction = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuction(response.data)
                getSimilarAuction(response.data.categoryId)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const deleteAuction = () => {
        axios.delete('http://localhost:4941/api/v1/auctions/' + id)
            .then(() => {
                handleDeleteDialogClose()
                navigate("/")
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const postBid = () => {
        if (bid <= 0) {
            setBidFlag(true)
            setBidMessage("Bid must be more than 0!")
        } else if (bid <= auction.highestBid) {
            setBidFlag(true)
            setBidMessage("Bid must be more than the highest bid!")
        } else if (auction.sellerId === Number(localStorage.getItem("userId")!)) {
            setBidFlag(true)
            setBidMessage("Can't Place bid on your own Auction!")
        } else {
            axios.post('http://localhost:4941/api/v1/auctions/' + id + '/bids', {"amount": Number(bid)},
                {
                    headers:
                        {'X-Authorization': localStorage.getItem("auth_token")!}
                })
                .then(() => {
                    handleBidDialogClose()
                    setSnackMessage("Bid place successfully")
                    setSnackOpen(true)
                    getOneAuction()
                    getAuctionBid()
                }, (error) => {
                    setBidFlag(true)
                    setBidMessage(error.response.statusText)
                })
        }
    }

    const updateBidState = (event: any) => {
        setBid(+event.target.value)
    }

    const getAuctionBid = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + id + '/bids')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setBids(response.data)
                sethighestBidderId(response.data[0].bidderId)
                sethighestFirstnameBidder(response.data[0].firstName)
                sethighestLastnameBidder(response.data[0].lastName)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const getSimilarAuction = (id: number) => {
        axios.get('http://localhost:4941/api/v1/auctions?categoryIds=' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setSimilarAuction(response.data.auctions)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const getCategory = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setCategory(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const checkCategory = (x: number) => {
        let name = ""
        for(let i = 0; i < category.length; i++) {
            if(x === category[i].categoryId){
                name = category[i].name
                return name
            }
        }
    }

    const changeDate = (x: string) => {
        return new Date(x).toLocaleString()
    }

    const checkNull = (x: any) => {
        if(x === null){
            return 0
        } else {
            return x
        }
    }

    const checkDate = (x: any) => {
        const daysBetween: number = (Math.trunc((new Date(x).getTime() - new Date().getTime())/(86400 * 1000)))
        if (daysBetween < 0) {
            return <h6 style={{fontSize: "12px",
                color: '#58111A'}}> Auction End </h6>
        } if (daysBetween === 0) {
            return <h6 style={{fontSize: "12px",
                color: '#FF0800'}}> Close Today </h6>
        } if (daysBetween === 1) {
            return <h6 style={{fontSize: "12px",
                color: '#CD5700'}}> Close Tomorrow </h6>
        } if (daysBetween > 1 && daysBetween < 14) {
            return <h6 style={{fontSize: "12px",
                color: '#FEBE10'}}> Close in {daysBetween} days </h6>
        } if (daysBetween >= 14) {
            return <h6 style={{fontSize: "12px",
                color: '#006400'}}> Close in {daysBetween} days </h6>
        }
    }

    const checkReserve = (x: any) => {
        if(x.highestBid >= x.reserve) {
            return <h6 style={{fontSize: "25px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'green'}}>Reserved Met</h6>
        } else {
            return <h6 style={{fontSize: "25px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'red'}}>Reserved Not Met</h6>
        }
    }

    const getImageDefault = (event: any) => {
        event.target.src = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
    }

    const getAuctionDefault = (event: any) => {
        event.target.src = "https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg"
    }

    const get_similarauctions_rows = () => {
        return (similarauction.filter(similarauction => similarauction.auctionId !== auction.auctionId).map((row) =>
                <TableRow hover
                          tabIndex={-1}>
                    <TableCell><img style={{
                        height: "55px", width: "70px"}} src={"http://localhost:4941/api/v1/auctions/" + row.auctionId + "/image"}
                                    onError={getAuctionDefault}/>
                    </TableCell>
                    <TableCell style={{fontSize: "12px"}}>{row.title}</TableCell>
                    <TableCell style={{fontSize: "12px"}}>${checkNull(row.highestBid)}</TableCell>
                    <TableCell style={{fontSize: "12px"}}>${row.reserve}</TableCell>
                    <TableCell>{checkDate(row.endDate.toString())}</TableCell>
                    <TableCell>
                        <Button onClick={() => {handleSimilarAuctionClose(); navigate("/auction/" + row.auctionId)}} variant="contained" endIcon={<ArticleIcon/>}>
                            View
                        </Button>
                    </TableCell>
                </TableRow>
            )
        )
    }

    const get_bidders_rows = () => {
        return (bids.map((row) =>
                <TableRow hover
                          tabIndex={-1}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>${row.amount}</TableCell>
                    <TableCell>{changeDate(row.timestamp.toString())}</TableCell>
                    <TableCell>
                        <img style={{
                            height: "100px", width: "100px"}} src={"http://localhost:4941/api/v1/users/" + row.bidderId + "/image"}
                             onError={getImageDefault}/>
                    </TableCell>
                </TableRow>
            )
        )
    }

    const auction_detail_rows = (auction: any, bids: any, similarauction: any) => {
        return (
            <Paper elevation={24} style={cardDiv}>
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    margin: "auto"}}>
                    <h1 style={{
                        fontSize: "48px",
                        fontWeight: 'bold'}}>{auction.title}</h1>
                </div>
                <div style={{
                    padding: "5px"}}>
                    <img style={{display:"inline-block",
                        height: "50%",
                        width: "50%",
                        borderRadius: "30px"}}
                         src={"http://localhost:4941/api/v1/auctions/" + auction.auctionId + "/image"} onError={getAuctionDefault}/>
                </div>
                <div style={{display:"inline-block",
                    width: "50%"}}>
                    <h1>{checkReserve(auction)}</h1>
                </div>
                <div style={{display:"inline-block",
                    width: "50%",
                    marginTop: "15px"}}>
                    { localStorage.length === 0?
                        <NavBtnLink to='/login'>Login to Place a Bid</NavBtnLink>:
                        <Button variant="contained"
                                color="success"
                                endIcon={<AttachMoneyIcon/>}
                                onClick={() => handleBidDialogOpen(bids)}>
                            Place Bid
                        </Button>                           
                    }
                    <Dialog
                        open={openBidDialog}
                        onClose={handleBidDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Place a Bid"}
                        </DialogTitle>
                        {BidFlag?
                            <Alert severity="error" variant="filled" >
                                {BidMessage}
                            </Alert>
                            :""}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={bid}
                                        onChange={updateBidState}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                    />
                                </FormControl>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleBidDialogClose}>Cancel</Button>
                            <Button variant="outlined" color="success" onClick={() => {postBid()}} autoFocus>
                                Bid
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar
                        autoHideDuration={6000}
                        open={snackOpen}
                        onClose={handleSnackClose}
                        key={snackMessage}
                    >
                        <Alert onClose={handleSnackClose} severity="success" sx={{
                            width: '100%' }}>
                            {snackMessage}
                        </Alert>
                    </Snackbar>
                </div>
                <div style={{display:"inline-block",
                    padding:"5px",
                    width: "100%",
                    textAlign:"center"}}>
                    <h2 style={headingLeft}>Description:</h2>
                    <h2 style={{fontSize: "20px", textAlign:"left", color: '#fff'}}>{auction.description}</h2>
                </div>
                <div style={halfCell}>
                    <h2 style={headingCen}>Seller:</h2>
                    <h3 style={textCen}> {auction.sellerFirstName} {auction.sellerLastName} </h3>
                    <img style={{
                        height: "100px", width: "150px"}} src={"http://localhost:4941/api/v1/users/" + auction.sellerId + "/image"} onError={getImageDefault}/>
                </div>
                <div style={halfCell1}>
                    <h2 style={headingCen}>Current Bidder:</h2>
                    { highestFirstnameBidder !== "" && highestLastnameBidder !== ""?
                        <div>
                            <h3 style={textCen}> {highestFirstnameBidder} {highestLastnameBidder} </h3>
                            <img style={{height: "100px", width: "150px"}} src={"http://localhost:4941/api/v1/users/" + highestBidderId + "/image"}
                             onError={getImageDefault}/>
                        </div>:
                        <div>
                            <h3 style={textCen}> No Top Bidder </h3>
                            <img style={{height: "100px", width: "150px"}} src={"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
                            onError={getImageDefault}/>
                        </div>
                    }
                </div>
                <div style={oneThirdCell}>
                    <h2 style={headingCen}>Number of Bids:</h2>
                    <h3 style={textCen}> {auction.numBids} </h3>
                </div>
                <div style={oneThirdCell}>
                    <h2 style={headingCen}>Reserve Price:</h2>
                    <h3 style={textCen}> ${auction.reserve} </h3>
                </div>
                <div style={oneThirdCell}>
                    <h2 style={headingCen}>Current Bid:</h2>
                    <h3 style={textCen}> ${checkNull(auction.highestBid)} </h3>
                </div>
                <div style={halfCell}>
                    <h2 style={headingCen}>Category:</h2>
                    <h3 style={textCen}> {checkCategory(auction.categoryId)} </h3>
                </div>
                <div style={halfCell}>
                    <h2 style={headingCen}>End Date:</h2>
                    <h3 style={textCen}> {changeDate(auction.endDate.toString())} </h3>
                </div>
                <div style={halfCell}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        { similarauction.length !== 1?
                            <Button variant="contained" endIcon={<ArticleIcon/>}
                                    onClick={() => handleSimilarAuctionOpen(similarauction)}>
                                View Similar Auctions
                            </Button>:
                            <Button variant="contained" endIcon={<ArticleIcon/>} disabled>
                                View Similar Auctions
                            </Button>
                        }
                        <Dialog
                            open={openSimilarAuctionDialog}
                            onClose={handleSimilarAuctionClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Similar Auctions"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={headingCenDialog}>
                                                Photo
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Title
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Bid
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Reserve
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                End date
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                View
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {get_similarauctions_rows()}
                                    </TableBody>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSimilarAuctionClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </div>
                <div style={halfCell}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        { auction.numBids > 0?
                            <Button variant="contained" endIcon={<AttachMoneyIcon/>}
                                    onClick={() => handleBidderDialogOpen(bids)}>
                                View Bidders
                            </Button>:
                            <Button variant="contained" endIcon={<AttachMoneyIcon/>} disabled>
                                View Bidders
                            </Button>
                        }
                        <Dialog
                            open={openBidderDialog}
                            onClose={handleBidderDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Bidders"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={headingCenDialog}>
                                                Firstname
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Lastname
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Amount
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Timestamp
                                            </TableCell>
                                            <TableCell style={headingCenDialog}>
                                                Profile Picture
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {get_bidders_rows()}
                                    </TableBody>
                                </DialogContentText>
                            </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleBidderDialogClose}>Close</Button>
                                </DialogActions>
                        </Dialog>
                    </Stack>
                </div>
            </Paper>
        )
    }

    const oneThirdCell: CSS.Properties = {
        display:"inline-block",
        width: "33%",
        padding: "5px",
    }

    const buttonStyle: CSS.Properties = {
        display:"inline-block",
        width: "75%",
        margin: "left",
        padding:"5px",
    }

    const halfCell: CSS.Properties = {
        display:"inline-block",
        width: "50%",
        padding:"5px",
        textAlign: "center"
    }

    const halfCell1: CSS.Properties = {
        display:"inline-block",
        width: "50%",
        padding:"5px",
        textAlign: "center"
    }

    const headingCenDialog: CSS.Properties = {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign:"center",
        fontSize: "12px",
    }

    const headingCen: CSS.Properties = {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign:"center",
        fontSize: "12px",
        color: '#fff'
    }

    const textCen: CSS.Properties = {
        textAlign:"center",
        fontSize: "16px",
        color: '#fff'
    }

    const headingLeft: CSS.Properties = {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign:"left",
        color: '#fff'
    }

    const card: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        width: "65%",
        backgroundColor: '#3E2C41',
        borderRadius: "15px",
        marginTop: "1%",
        marginBottom: "1%"
    }

    const cardDiv: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        textAlign: "center",
        width: "100%",
        backgroundColor: '#5C527F',
        borderRadius: "15px",
        marginBottom: "15px"
    }

    return (
        <div>
            <NavTop/>
            <div>
                <Paper elevation={10} style={card}>
                    <div style={buttonStyle}>
                        <BackBtn>
                            <BackBtnLink to={"/"}>
                                Back to Auctions
                            </BackBtnLink>
                        </BackBtn>
                    </div>
                    <div style={{display:"inline-block",
                        padding: "5px"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            { localStorage.getItem("userId") === null || Number(localStorage.getItem("userId")) !== auction.sellerId || auction.numBids > 0?
                                <Button variant="contained" color="error" endIcon={<DeleteIcon/>} disabled>
                                    Delete Auction
                                </Button>:
                                <Button variant="contained" color="error" endIcon={<DeleteIcon/>} onClick={() => {handleDeleteDialogOpen(auction)}}>
                                Delete Auction
                                </Button>
                            }
                            <Dialog
                                open={openDeleteDialog}
                                onClose={handleDeleteDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">
                                    {"Delete This Auction?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete this Auction?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                                    <Button variant="outlined" color="error" onClick={() => {deleteAuction()}} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    </div>
                    <div style={{display:"inline-block",
                        padding: "5px"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            <Button variant="contained" color="secondary" endIcon={<EditIcon/>}>
                                Edit
                            </Button>
                        </Stack>
                    </div>
                    <h1 style={{fontSize: "50px",
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: '#fff',
                        textShadow: "3px 3px #5C527F",
                        textDecorationLine: 'underline'}}>Auction Details</h1>
                    <div style={{
                        margin: "auto",
                        width: "90%"}}>
                        {errorFlag?
                            <Alert severity="error" variant="filled" >
                                {errorMessage}
                            </Alert>
                            :""}
                    </div>
                    <div style={{
                        margin: "auto",
                        width: "90%"}}>
                        {auction_detail_rows(auction, bids, similarauction)}
                    </div>
                </Paper>
            </div>
            <NavBottom/>
        </div>
    )
}
export default Auction;