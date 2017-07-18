<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SB Admin 2 - Bootstrap Admin Theme</title>

    <!-- Bootstrap Core CSS -->

    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">IEEE Online Test</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="/user/profile"><i class="fa fa-user fa-fw"></i>Profile</a>
                        </li>
                        <li><a href="/user/setting"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="/logout"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search..." >
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <% for(var i=0;i<menu.length;i++){%>
                        <li>
                            <a href="<%= menu[i].url %>"><i class="fa fa-dashboard fa-fw"></i><%= menu[i].name %></a>
                        </li>
                        <% } %>
                        
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header" id="demo">Blank</h1>
                        <form action="submit" method="post">
                        <% for(var i=0;i<data.length;i++){%>
                        <div id=="abcd">
                            <h3>Q<%= i+1 %>:-<%= data[i].question %></h3>
                            <h4><input type="radio" name="<%= data[i]._id %>" value="1"> <%= data[i].option1 %></h4>
                            <h4><input type="radio" name="<%= data[i]._id %>" value="2"> <%=data[i].option2 %></h4>
                            <h4><input type="radio" name="<%= data[i]._id %>" value="3"> <%=data[i].option3 %></h4>
                            <h4><input type="radio" name="<%= data[i]._id %>" value="4"> <%=data[i].option4 %></h4>
                            
                            ----------------------------------------------------------------
                            ---------------------------------------------------------------------------------------------------------------------------------<br>
                            ----------------------------------------------------------------
                            ---------------------------------------------------------------------------------------------------------------------------------

                        </div>
                        <% } %>
                        <input type="hidden" name="cid" value="<%= cid %>">
                        <input type="submit" value="SUBMIT AND EXIT">
                        </form>
                        
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="../vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

</body>

<!-- Script for countdown timer -->
<script type="text/javascript">
    var time = new Date("<%= data[0].contest.endTime %>")  - new Date()
    console.log(time)
    time = time/1000
    var x = setInterval(function(){
        document.getElementById("demo").innerHTML = time
        time = time-1
        if(time<0){
            clearInterval()
            alert("Time is over")
            location.href = "/ok"

        }
    },1000)
</script>
</html>
